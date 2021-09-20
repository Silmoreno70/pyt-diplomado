import { Context } from "../../utils";

export default {
  customers: (parent, args, ctx: Context) => ctx.prisma.customers(args),
  customer: (parent, args, ctx: Context) => ctx.prisma.customer(args.where),
};