import { Context } from "../../utils";

export default {
  seats: (parent, args, ctx: Context) => ctx.prisma.seats(args),
  seat: (parent, args, ctx: Context) => ctx.prisma.seat(args.where),
};