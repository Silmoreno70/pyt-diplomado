import { Context } from "../../utils";

export default {
  movies: (parent, args, ctx: Context) => ctx.prisma.movies(args),
  movie: (parent, args, ctx: Context) => ctx.prisma.movie(args.where),
};