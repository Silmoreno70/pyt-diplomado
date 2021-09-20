import { Context } from "../../utils";

export default {
  createMembership: (parent, args, ctx: Context) => ctx.prisma.createMembership(args.data)
}