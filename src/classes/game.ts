import { z } from "zod";
const Game = z.object({
  name: z.string(),
  icon: z.string(),
  times: z.object({}),
});

export type Game = z.infer<typeof Game>;
