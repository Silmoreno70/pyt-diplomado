import * as bcrypt from "bcryptjs";
import { UserCreateInput } from "../../generated/prisma-client";
import { Context } from "../../utils";
import * as jwt from 'jsonwebtoken'

export default {
  async setPwd(parent, args, ctx: Context) {
    const { pwd, token } = args.data;
    const password = await bcrypt.hash(pwd, 10);
    return await ctx.prisma.updateUser({ data: { password }, where: { token }});
  },
  updateUser: (parent, args: { data: any, where: any}, ctx: Context) => ctx.prisma.updateUser(args),
  createUser: async (parent, { data }: { data: UserCreateInput}, ctx: Context) => {
    const token = jwt.sign({ userId: data.id }, process.env.APP_SECRET, {expiresIn: "10h"})
    const pass = await bcrypt.hash(data.password, 10)
    console.log(pass)
    data = {
      token,
      ...data,
      password: pass
    }
  return ctx.prisma.createUser(data)
  }
};
