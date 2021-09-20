import { Context } from "../../utils";

export default {
  createShow: (parent, args, ctx: Context) => ctx.prisma.createShow(args.data)
}