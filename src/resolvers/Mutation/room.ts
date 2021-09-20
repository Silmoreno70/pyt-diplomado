import { Context } from "../../utils";

export default {
  createRoom: (parent, args, ctx: Context) => ctx.prisma.createRoom(args.data)
}