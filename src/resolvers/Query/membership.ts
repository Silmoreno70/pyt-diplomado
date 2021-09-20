import { Context } from "../../utils";

export default {
  memberships: (parent, args, ctx: Context) => ctx.prisma.memberships(args),
  membership: (parent, args, ctx: Context) => ctx.prisma.membership(args.where),
};