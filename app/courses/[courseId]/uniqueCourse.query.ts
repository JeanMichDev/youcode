import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getUniqueCourse = async (courseId: string) => {
  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    select: {
      id: true,
      image: true,
      name: true,
      presentation: true,
      creator: {
        select: {
          image: true,
          name: true,
        },
      },
      lessons: {
        select: {
          id: true,
          name: true,
          rank: true,
        },
      },
    },
  });
  return course;
};

export type UniqueCourse = Prisma.PromiseReturnType<typeof getUniqueCourse>;

// model Lesson {
//   id      String      @id @default(cuid())
//   name    String
//   rank    String // A string that represents the order of the lesson
//   content String // markdown
//   state   LessonState @default(HIDDEN)
//   createdAt DateTime       @default(now())
//   course    Course         @relation(fields: [courseId], references: [id])
//   courseId  String
//   users     LessonOnUser[]
// }
