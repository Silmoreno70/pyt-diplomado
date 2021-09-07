import { GraphQLServer } from 'graphql-yoga'
import { prisma } from "./generated/prisma-client";
import { permissions } from './config/permissions'
import { typeDefs } from './config/graphql';
import resolvers from './resolvers';
import { getUserId } from "./utils";

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
  middlewares: [permissions],
  context: (request) => ({
    ...request,
    prisma,
    user: getUserId(request)
  }),
});

const port = process.env.PORT || 4000;

const opts = {
  port,
  tracing: true,
  debug: false,
  bodyParserOptions: { limit: "2mb", type: "application/json" },
  cors: {
    credentials: true,
    origin: "*",
    // endpoint: "/graphql",
    // playground: "/playground",
  },
};

server.start(opts, () => console.log(`Server is running on http://localhost:${port}`));
