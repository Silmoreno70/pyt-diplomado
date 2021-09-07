import { shield, allow, deny, or, and } from "graphql-shield";
const { ApolloError, } = require("apollo-server");
import { isAuthenticated } from "./polices";


export const permissions = shield(
  {
    Query: {
      "*": allow,
    },
    Mutation: {
      "*": allow,
    },
    Subscription: {
      "*": allow,
    },
    User: {
      "*": allow,
    },
    File: {
      "*": allow,
    },
  },
  {
    allowExternalErrors: true,
    debug: true,
    fallbackError: (thrownThing, parent, args, context, info) => {
      if (thrownThing instanceof ApolloError) {
        // expected errors
        return thrownThing
      } else if (thrownThing instanceof Error) {
        // unexpected errors
        console.error(thrownThing)
        // await Sentry.report(thrownThing)
        return new ApolloError('Internal server error', 'ERR_INTERNAL_SERVER')
      } else {
        // what the hell got thrown
        console.error('The resolver threw something that is not an error.')
        console.error(thrownThing)
        return new ApolloError('Internal server error', 'ERR_INTERNAL_SERVER')
      }
    },
  }
  // { fallbackRule: deny },
);
