import { Context } from "../../utils";

export default {
  rooms: (parent, args, ctx: Context) => ctx.prisma.rooms(args),
  room: (parent, args, ctx: Context) => ctx.prisma.room(args.where),
};