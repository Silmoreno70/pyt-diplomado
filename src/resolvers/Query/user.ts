import { Context } from "../../utils";

export default {
  users: (parent, args, ctx: Context) => ctx.prisma.users(),
  user: (parent, args, ctx: Context) => ctx.prisma.user(args.where),
};
