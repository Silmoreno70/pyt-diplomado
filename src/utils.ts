import * as jwt from 'jsonwebtoken'
import { ID_Input, Prisma, prisma } from './generated/prisma-client'
import { ContextParameters } from "graphql-yoga/dist/types";
const { ApolloError } = require("apollo-server");

export interface Context {
  prisma: Prisma
  request: any
  user: any
}

export function getUserId(ctx: ContextParameters): ID_Input {
  const Authorization = ctx.request.get('Authorization')
  try {
    if (Authorization) {
      const token = Authorization.replace("Bearer ", "");
      if (!token) return null;
      const { userId } = jwt.verify(token, process.env.APP_SECRET) as { userId: string; };
      return userId;
    }
    return null;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getUser(ctx: ContextParameters) {
  try {
    const userId = getUserId(ctx);
    if (!userId) return null;
    return await prisma.user({ id: userId });
  } catch (error) {
    throw new Error(error);
  }
}