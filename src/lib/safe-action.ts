import { createSafeActionClient } from "next-safe-action";
import { getAuthSession } from "./auth";

export class ServerError extends Error {}

export const actionClient = createSafeActionClient({
  handleServerError: (error) => {
    if (error instanceof ServerError) {
      return {
        serverError: error.message,
      };
    }
    return {
      serverError: "An unexpected error occurred",
    };
  },
});
export const authentificatedAction = actionClient.use(async ({ next }) => {
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
