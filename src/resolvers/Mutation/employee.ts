import { Context } from "../../utils";

export default {
  createEmployee: (parent, args, ctx: Context) => ctx.prisma.createEmployee(args.data)
}