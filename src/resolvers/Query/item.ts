import { Context } from "../../utils";

export default {
  items: (parent, args, ctx: Context) => ctx.prisma.items(args),
  item: (parent, args, ctx: Context) => ctx.prisma.item(args.where),
};