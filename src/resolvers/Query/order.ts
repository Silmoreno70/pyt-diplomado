import { Context } from "../../utils";

export default {
  orders: (parent, args, ctx: Context) => ctx.prisma.orders(args),
  order: (parent, args, ctx: Context) => ctx.prisma.order(args.where),
};