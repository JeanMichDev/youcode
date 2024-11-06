import { getRequiredAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const toggleActiveUser = async (
  user: {
    id: string;
    canceled: boolean;
  },
  courseId: string
) => {
  const session = await getRequiredAuthSession();
  const courseOnUser = await prisma.courseOnUser.findFirst({
    where: {
      userId: user.id,
      course: {
        id: courseId,
        creatorId: session.user.id,
      },
    },
  });
  if (!courseOnUser) {
    return;
  }
  await prisma.courseOnUser.update({
    where: {
      id: courseOnUser.id,
    },
    data: {
      canceledAt: user.canceled ? null : new Date(),
    },
  });

  revalidatePath(`/admin/courses/${courseId}`);
};
