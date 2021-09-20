import { Context } from "../../utils";

export default {
  comboes: (parent, args, ctx: Context) => ctx.prisma.comboes(args),
  combo: (parent, args, ctx: Context) => ctx.prisma.combo(args.where),
};