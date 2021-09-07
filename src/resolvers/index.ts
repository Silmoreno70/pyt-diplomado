import { Subscription } from './Subscription'

const path = require("path");
const { mergeResolvers, fileLoader } = require("merge-graphql-schemas");

const resolversQuery = fileLoader(path.join(__dirname, "./Query/**/*.ts"));
const Query = mergeResolvers(resolversQuery);

const resolversMutation = fileLoader(path.join(__dirname, "./Mutation/**/*.ts"));
const Mutation = mergeResolvers(resolversMutation);

export default {
  Query,
  Mutation,
  Subscription,
};
