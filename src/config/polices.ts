import { rule } from "graphql-shield";
import { getUser } from '../utils'
const { ApolloError } = require("apollo-server");


export const isAuthenticated = rule({ cache: "contextual" })(
  async (parent, args, ctx, info) => {
    const user = await getUser(ctx);
    if (user == null) {
      return new ApolloError(
        "user not loged",
        "ERR_NOT_LOGED"
      );
    }
    return true;
  }
);