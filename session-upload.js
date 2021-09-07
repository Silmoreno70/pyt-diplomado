var os = require("os");
if (os.platform() == "win32") {
  if (os.arch() == "ia32") {
    var chilkat = require("@chilkat/ck-node11-win-ia32");
  } else {
    var chilkat = require("@chilkat/ck-node11-win64");
  }
} else if (os.platform() == "linux") {
  if (os.arch() == "arm") {
    var chilkat = require("@chilkat/ck-node11-arm");
  } else if (os.arch() == "x86") {
    var chilkat = require("@chilkat/ck-node11-linux32");
  } else {
    var chilkat = require("@chilkat/ck-node11-linux64");
  }
} else if (os.platform() == "darwin") {
  var chilkat = require("@chilkat/ck-node11-macosx");
}

function chilkatExample() {
  // This example requires the Chilkat API to have been previously unlocked.
  // See Global Unlock Sample for sample code.

  var http = new chilkat.Http();
  var success;

  // Use your previously obtained access token here:
  // See the following examples for getting an access token:
  //    Get Microsoft Graph OAuth2 Access Token (Azure AD v2.0 Endpoint).
  //    Get Microsoft Graph OAuth2 Access Token (Azure AD Endpoint).
  //    Refresh Access Token (Azure AD v2.0 Endpoint).
  //    Refresh Access Token (Azure AD Endpoint).

  // (Make sure your token was obtained with the Files.ReadWrite scope.)
  http.AuthToken = "MICROSOFT_GRAPH_ACCESS_TOKEN";

  // ----------------------------------------------------------------------------
  // Step 1: Create an upload session

  // To begin a large file upload, your app must first request a new upload session. This creates a
  // temporary storage location where the bytes of the file will be saved until the complete file is uploaded.
  // Once the last byte of the file has been uploaded the upload session is completed and the final file is shown
  // in the destination folder.

  // Send the following POST to create an upload session:
  // POST /v1.0/users/me/drive/root:/{path_to_item}:/createUploadSession

  http.SetUrlVar("path_to_item", "/somefolder/big.zip");
  var url =
    "https://graph.microsoft.com/v1.0/me/drive/root:/{$path_to_item}:/createUploadSession";
  // resp: HttpResponse
  var resp = http.PostJson2(url, "application/json", "{}");
  if (http.LastMethodSuccess !== true) {
    console.log(http.LastErrorText);
    return;
  }

  // If successful, a 200 status code is returned, with the session details (in JSON format).
  var jsonSession = new chilkat.JsonObject();
  jsonSession.EmitCompact = false;
  jsonSession.Load(resp.BodyStr);

  if (resp.StatusCode !== 200) {
    console.log(jsonSession.Emit());
    console.log("Response status = " + resp.StatusCode);

    return;
  }

  console.log(jsonSession.Emit());

  // A sample response:

  // 	{
  // 	  "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#microsoft.graph.uploadSession",
  // 	  "uploadUrl": "https://api.onedrive.com/rup/3a33fceb9b74cc15/eyJSZXNvdXJjZUlEI ... 65yDYUiS3JTDnnhqCHxw",
  // 	  "expirationDateTime": "2017-06-11T12:40:23.239Z",
  // 	  "nextExpectedRanges": [
  // 	    "0-"
  // 	  ]
  // 	}
  //

  // ----------------------------------------------------------------------------
  // Step 2: Upload Data in Segments (a.k.a. Fragments or Chunks)

  // Microsoft states this requirement: Use a fragment size that is a multiple of 320 KiB (320 * 1024 bytes).
  // Failing to use a fragment size that is a multiple of 320 KiB can result in large file transfers failing after the
  // last fragment is uploaded.  (Note: This is a detail imposed by Microsoft's OneDrive server-side implementation.)

  var fragSize = 320 * 1024;
  var localFilePath = "qa_data/zips/big.zip";

  // Upload the file big.zip in 320KiB segments.
  var fac = new chilkat.FileAccess();
  var fileSize = fac.FileSize(localFilePath);

  // Open the file to get the number of fragments.
  success = fac.OpenForRead(localFilePath);
  if (success == false) {
    console.log(fac.LastErrorText);
    return;
  }

  var numFragments = fac.GetNumBlocks(fragSize);
  fac.FileClose();

  var i = 0;

  console.log("fileSize = " + fileSize);
  console.log("numFragments = " + numFragments);

  var uploadUrl = new chilkat.Url();
  uploadUrl.ParseUrl(jsonSession.StringOf("uploadUrl"));

  var json = new chilkat.JsonObject();
  json.EmitCompact = false;

  var req = new chilkat.HttpRequest();
  req.HttpVerb = "PUT";
  req.Path = uploadUrl.PathWithQueryParams;
  req.ContentType = "application/octet-stream";

  var sbOffset = new chilkat.StringBuilder();
  var sbNumBytes = new chilkat.StringBuilder();
  var sbRange = new chilkat.StringBuilder();

  // IMPORTANT: The uploadUrl is a temporary URL to be used to upload the fragment.
  // It requires no authentication (because the URL itself could only have been obtained from an authenticated
  // request to start the upload session).  Therefore, do not allow the upload URL to be publicly seen,
  // otherwise anybody could upload to your OneDrive.
  http.AuthToken = "";

  var bytesRemaining = fileSize;
  while (i < numFragments) {
    // The success response code for intermediate chunks is 202,
    // whereas the final chunk will have a 201 success response where
    // the response body is the JSON DriveItem.
    var chunkSize = fragSize;
    var expectedStatusCode = 202;
    if (bytesRemaining < chunkSize) {
      chunkSize = bytesRemaining;
      expectedStatusCode = 201;
    }

    console.log("  this chunkSize = " + chunkSize);

    // Indicate the fragment in the local file to be streamed in the upload.
    sbOffset.Clear();
    sbOffset.AppendInt(i * fragSize);
    sbNumBytes.Clear();
    sbNumBytes.AppendInt(chunkSize);
    req.StreamChunkFromFile(
      localFilePath,
      sbOffset.GetAsString(),
      sbNumBytes.GetAsString()
    );

    // The Content-Range header field must be set for this fragment.  For example:
    // Content-Range: bytes 0-25/128
    sbRange.SetString("bytes start-end/fileSize");
    var numReplaced = sbRange.ReplaceI("start", i * fragSize);
    numReplaced = sbRange.ReplaceI("end", i * fragSize + chunkSize - 1);
    numReplaced = sbRange.ReplaceI("fileSize", fileSize);
    req.AddHeader("Content-Range", sbRange.GetAsString());
    console.log("  this content-range: " + sbRange.GetAsString());

    resp = http.SynchronousRequest(uploadUrl.Host, 443, true, req);
    if (http.LastMethodSuccess !== true) {
      console.log(http.LastErrorText);
      return;
    }

    json.Load(resp.BodyStr);
    // A 202 response status code indicates success.
    if (resp.StatusCode !== expectedStatusCode) {
      console.log(json.Emit());
      console.log("Response status = " + resp.StatusCode);

      return;
    }

    console.log(json.Emit());
    console.log("---- Chunk " + i + " uploaded ----");

    bytesRemaining = bytesRemaining - chunkSize;
    i = i + 1;
  }

  console.log("data uploaded.");

  // ----------------------------------------------------------------------------
  // Sample output for the above session:

  // {
  //   "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#microsoft.graph.uploadSession",
  //   "uploadUrl": "https://api.onedrive.com/rup/3a33fceb9b74cc15/eyJSZXNvd ... QoKK2iuh1A",
  //   "expirationDateTime": "2017-06-11T14:04:45.438Z",
  //   "nextExpectedRanges": [
  //     "0-"
  //   ]
  // }
  //
  // fileSize = 1366807
  // numFragments = 5
  //   this chunkSize = 327680
  //   this content-range: bytes 0-327679/1366807
  // {
  //   "expirationDateTime": "2017-06-11T14:04:45.438Z",
  //   "nextExpectedRanges": [
  //     "327680-1366806"
  //   ]
  // }
  //
  // ---- Chunk 0 uploaded ----
  //   this chunkSize = 327680
  //   this content-range: bytes 327680-655359/1366807
  // {
  //   "expirationDateTime": "2017-06-11T14:04:45.438Z",
  //   "nextExpectedRanges": [
  //     "655360-1366806"
  //   ]
  // }
  //
  // ---- Chunk 1 uploaded ----
  //   this chunkSize = 327680
  //   this content-range: bytes 655360-983039/1366807
  // {
  //   "expirationDateTime": "2017-06-11T14:04:45.438Z",
  //   "nextExpectedRanges": [
  //     "983040-1366806"
  //   ]
  // }
  //
  // ---- Chunk 2 uploaded ----
  //   this chunkSize = 327680
  //   this content-range: bytes 983040-1310719/1366807
  // {
  //   "expirationDateTime": "2017-06-11T14:04:45.438Z",
  //   "nextExpectedRanges": [
  //     "1310720-1366806"
  //   ]
  // }
  //
  // ---- Chunk 3 uploaded ----
  //   this chunkSize = 56087
  //   this content-range: bytes 1310720-1366806/1366807
  // {
  //   "createdBy": {
  //     "application": {
  //       "displayName": "Chilkat",
  //       "id": "441c9990"
  //     },
  //     "user": {
  //       "id": "3a33fceb9b74cc15"
  //     }
  //   },
  //   "createdDateTime": "2017-06-04T14:04:47.247Z",
  //   "cTag": "aYzozQTMzRkNFQjlCNzRDQzE1ITQ4NjguMjU3",
  //   "eTag": "aM0EzM0ZDRUI5Qjc0Q0MxNSE0ODY4LjA",
  //   "id": "3A33FCEB9B74CC15!4868",
  //   "lastModifiedBy": {
  //     "application": {
  //       "displayName": "Chilkat",
  //       "id": "441c9990"
  //     },
  //     "user": {
  //       "id": "3a33fceb9b74cc15"
  //     }
  //   },
  //   "lastModifiedDateTime": "2017-06-04T14:04:47.247Z",
  //   "name": "big.zip",
  //   "parentReference": {
  //     "driveId": "3a33fceb9b74cc15",
  //     "id": "3A33FCEB9B74CC15!4862",
  //     "name": "someFolder",
  //     "path": "/drive/root:/someFolder"
  //   },
  //   "size": 1366807,
  //   "webUrl": "https://1drv.ms/u/s!ABXMdJvr_DM6pgQ",
  //   "file": {
  //     "hashes": {
  //       "sha1Hash": "252059AA13004220DB912B97D4D3FF9599CCD8D9"
  //     },
  //     "mimeType": "application/zip"
  //   },
  //   "fileSystemInfo": {
  //     "createdDateTime": "2017-06-04T14:04:47.246Z",
  //     "lastModifiedDateTime": "2017-06-04T14:04:47.246Z"
  //   },
  //   "tags": [
  //   ],
  //   "lenses": [
  //   ]
  // }
  //
  // Response status = 201
}

chilkatExample();
