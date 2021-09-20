import { Context } from "../../utils";

export default {
  createItem: (parent, args, ctx: Context) => ctx.prisma.createItem(args.data)
}