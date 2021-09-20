import { Context } from "../../utils";

export default {
  createCombo: (parent, args, ctx: Context) => ctx.prisma.createCombo(args.data)
}