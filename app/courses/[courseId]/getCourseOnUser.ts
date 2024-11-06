import { getRequiredAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const getCourseOnUser = async (courseId: string) => {
  const session = await getRequiredAuthSession();
  const userSession = session.user.id;
  const courseOnUser = await prisma.courseOnUser.findUnique({
    where: {
      userId_courseId: {
        userId: userSession,
        courseId,
      },
    },
  });
  return courseOnUser;
};
