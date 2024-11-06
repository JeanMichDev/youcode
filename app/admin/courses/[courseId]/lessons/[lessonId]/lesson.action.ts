"use server";
import { authentificatedAction, ServerError } from "@/lib/safe-action";
import { prisma } from "@/lib/prisma";
import {
  LessonActionEditContentSchema,
  LessonActionEdtitSchema,
  LessonFormSchema,
  SaveLessonMoveSchema,
} from "./lesson.schema";
import { getMiddleRank } from "@/lib/getMiddleRank";

export const lessonActionEdit = authentificatedAction
  .schema(LessonActionEdtitSchema)
  .action(async ({ parsedInput, ctx }) => {
    const lesson = await prisma.lesson.update({
      where: {
        id: parsedInput.lessonId,
        course: {
          creatorId: ctx.user.id,
        },
      },
      data: {
        ...parsedInput.data,
      },
    });
    return {
      message: "Lesson updated successfully",
      lesson,
    };
  });

export const lessonActionEditContent = authentificatedAction
  .schema(LessonActionEditContentSchema)
  .action(async ({ parsedInput, ctx }) => {
    const lesson = await prisma.lesson.update({
      where: {
        id: parsedInput.lessonId,
        course: {
          creatorId: ctx.user.id,
        },
      },
      data: {
        content: parsedInput.markdown,
      },
    });
    return {
      message: "Lesson updated successfully",
      lesson,
    };
  });

export const lessonActionCreate = authentificatedAction
  .schema(LessonActionEdtitSchema)
  .action(async ({ parsedInput, ctx }) => {
    const lesson = await prisma.lesson.create({
      data: {
        ...parsedInput.data,
        rank: "",
        content: "",
        createdAt: new Date().toISOString(),
      },
    });

    return {
      message: "Lesson created successfully",
      lesson,
    };
  });

export const saveLessonMove = authentificatedAction
  .schema(SaveLessonMoveSchema)
  .action(async ({ parsedInput, ctx }) => {
    const course = await prisma.course.findFirst({
      where: {
        lessons: {
          some: {
            id: parsedInput.lessonId,
          },
        },
        creatorId: ctx.user.id,
      },
    });
    if (!course) {
      throw new ServerError("Course not found");
    }
    const lesson = await prisma.lesson.findFirst({
      where: {
        id: parsedInput.lessonId,
        courseId: course.id,
      },
    });

    if (!lesson) {
      throw new ServerError("Lesson not found");
    }

    const newRank = getMiddleRank(
      parsedInput.upItemRank,
      parsedInput.downItemRank
    );

    await prisma.lesson.update({
      where: {
        id: lesson.id,
      },
      data: {
        rank: newRank,
      },
    });

    return newRank;
  });
