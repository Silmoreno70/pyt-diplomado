import * as bcrypt from "bcryptjs";
import { UserCreateInput } from "../../generated/prisma-client";
import { Context } from "../../utils";
import * as randomstring from 'randomstring'

export default {
  async setPwd(parent, args, ctx: Context) {
    const { pwd, token } = args.data;
    const password = await bcrypt.hash(pwd, 10);
    return await ctx.prisma.updateUser({ data: { password }, where: { token }});
  },
  updateUser: (parent, args: { data: any, where: any}, ctx: Context) => ctx.prisma.updateUser(args),
  createUser: async (parent, { data }: { data: UserCreateInput}, ctx: Context) => {
    const token = randomstring.generate(8).toUpperCase()
    const salt = bcrypt.genSaltSync(10)
    const password = await bcrypt.hashSync(data.password, salt)
    data = {
      token,
      ...data,
      password
    }
  return ctx.prisma.createUser(data)
  }
};
