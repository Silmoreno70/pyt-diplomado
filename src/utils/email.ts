import * as sgMail from "@sendgrid/mail";
const { SENDGRID_API_KEY } = process.env;
if(!SENDGRID_API_KEY) throw Error("missing SENDGRID_API_KEY")
sgMail.setApiKey(SENDGRID_API_KEY);

const templates = {
  password_set_confirm: {
    id: "d-97349f713ddd42df91a9e3c7171a11bd",
    subject: "Invitación a NumarqueCenter",
  },
};

interface emailData {
    receiver: string;
    sender: string;
    templateName: string;
    dynamicData: any;
}

export async function sendEmail(data: emailData) {
  const msg = {
    //extract the email details
    to: data.receiver,
    from: data.sender,
    subject: templates[data.templateName].subject,
    templateId: templates[data.templateName].id,
    // extract the custom fields
    dynamic_template_data: data.dynamicData
  };
  //send the email
  return await sgMail.send(msg);
}