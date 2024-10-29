import { createSafeActionClient } from "next-safe-action";
import { getAuthSession } from "./auth";

export class ServerError extends Error {}

export const actionClient = createSafeActionClient({
  handleServerError: (error) => {
    if (error instanceof ServerError) {
      return error.message;
    }
    return "An unexpected error occurred";
  },
});
export const authentificatedAction = actionClient.use(async ({ next }) => {
  const session = await getAuthSession();

  const user = session?.user;
  const userId = user?.id;

  if (!userId) {
    throw new ServerError("You must be logged in to perform this action");
  }

  const result = await next({
    ctx: {
      userId,
      user,
    },
  });

  return result;
});
