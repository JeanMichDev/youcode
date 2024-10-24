"use server";
import { authentificatedAction } from "@/lib/safe-action";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { LessonFormSchema } from "./lesson.schema";

const LessonActionEdtitSchema = z.object({
  lessonId: z.string(),
  data: LessonFormSchema,
});

export const lessonActionEdit = authentificatedAction
  .schema(LessonActionEdtitSchema)
  .action(async ({ parsedInput, ctx }) => {
    console.log(parsedInput, ctx);
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

export const lessonActionCreate = authentificatedAction
  .schema(LessonActionEdtitSchema)
  .action(async ({ parsedInput, ctx }) => {
    console.log(parsedInput, ctx);
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
