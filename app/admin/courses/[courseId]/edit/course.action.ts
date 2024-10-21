"use server";
import { z } from "zod";
import { CourseFormSchema } from "./course.schema";
import { authentificatedAction } from "@/lib/safe-action";
import { prisma } from "@/lib/prisma";

const CourseActionEdtitProps = z.object({
  courseId: z.string(),
  data: CourseFormSchema,
});

export const courseActionEdit = authentificatedAction
  .schema(CourseActionEdtitProps)
  .action(async ({ parsedInput, ctx }) => {
    await prisma.course.update({
      where: {
        id: parsedInput.courseId,
        creatorId: ctx.userId,
      },
      data: parsedInput.data,
    });
    return "Course updated successfully";
  });
