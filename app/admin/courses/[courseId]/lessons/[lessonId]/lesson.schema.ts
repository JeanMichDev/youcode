import { z } from "zod";
import { LessonState } from "@prisma/client";

export const LESSON_STATE = ["HIDDEN", "PUBLISHED", "PUBLIC"] as const;
export const LessonFormSchema = z.object({
  name: z.string().min(3).max(40),
  state: z.enum(LESSON_STATE),
  courseId: z.string(),
  id: z.string(),
});

export type LessonFormSchema = z.infer<typeof LessonFormSchema>;
