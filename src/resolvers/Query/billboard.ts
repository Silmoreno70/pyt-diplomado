import { Context } from "../../utils";

export default {
  billboards: (parent, args, ctx: Context) => ctx.prisma.billboards(args),
  billboard: (parent, args, ctx: Context) => ctx.prisma.billboard(args.where),
};