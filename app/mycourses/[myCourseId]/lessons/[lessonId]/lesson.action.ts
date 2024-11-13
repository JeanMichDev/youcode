"use server";

import { prisma } from "@/lib/prisma";
import { authentificatedAction } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const handleLessonStateSchema = z.object({
  lessonId: z.string(),
  progress: z.enum(["COMPLETED", "IN_PROGRESS", "NOT_STARTED"]),
});

export const handleLessonState = authentificatedAction
  .schema(handleLessonStateSchema)
  .action(async ({ parsedInput, ctx }) => {
    const updatedLessonOnUser = await prisma.lessonOnUser.update({
      where: {
        userId_lessonId: {
          userId: ctx.userId,
          lessonId: parsedInput.lessonId,
        },
      },
      data: {
        progress: parsedInput.progress,
      },
      select: {
        lesson: {
          select: {
            rank: true,
            courseId: true,
            id: true,
          },
        },
      },
    });
    const nextLesson = await prisma.lesson.findFirst({
      where: {
        courseId: updatedLessonOnUser.lesson.courseId,
        rank: {
          gt: updatedLessonOnUser.lesson.rank,
        },
        state: {
          not: "HIDDEN",
        },
      },
      orderBy: {
        rank: "asc",
      },
    });

    revalidatePath(
      `/mycourses/${updatedLessonOnUser.lesson.courseId}/lessons/${parsedInput.lessonId}`
    );

    if (!nextLesson) {
      return {};
    }

    redirect(
      `/mycourses/${updatedLessonOnUser.lesson.courseId}/lessons/${nextLesson.id}`
    );
  });
