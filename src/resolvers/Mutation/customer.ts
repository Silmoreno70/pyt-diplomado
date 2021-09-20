import { Context } from "../../utils";

export default {
  createCustomer: (parent, args, ctx: Context) => ctx.prisma.createCustomer(args.data)
}