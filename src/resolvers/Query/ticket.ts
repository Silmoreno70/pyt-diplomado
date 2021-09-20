import { Context } from "../../utils";

export default {
  tickets: (parent, args, ctx: Context) => ctx.prisma.tickets(args),
  ticket: (parent, args, ctx: Context) => ctx.prisma.ticket(args.where),
};