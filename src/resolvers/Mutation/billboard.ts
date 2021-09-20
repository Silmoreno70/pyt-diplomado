import { Context } from "../../utils";

export default {
  createBillboard: (parent, args, ctx: Context) => ctx.prisma.createBillboard(args.data)
}