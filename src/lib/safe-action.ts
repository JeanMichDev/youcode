import { createSafeActionClient } from "next-safe-action";
import { getAuthSession } from "./auth";

export class ServerError extends Error {}

export const action = createSafeActionClient({
  handleServerError: (error) => {
    // .
  },
});
export const authentificatedAction = action.use(async ({ next }) => {
  const session = await getAuthSession();

  const user = session?.user;

  if (!user) {
    throw new ServerError("You must be logged in to perform this action");
  }

  return next({
    ctx: {
      userId: user?.id,
      user,
    },
  });
});
