import { Context } from "../../utils";

export default {
  createOrder: (parent, args, ctx: Context) => ctx.prisma.createOrder(args.data)
}