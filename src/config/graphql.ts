const path = require("path");
import { mergeTypes, fileLoader } from "merge-graphql-schemas";

const typesArray = fileLoader(path.join(__dirname, "../types/**/*.graphql"));

// export const resolvers = require("../resolvers");
export const typeDefs = mergeTypes(typesArray, { all: true });
