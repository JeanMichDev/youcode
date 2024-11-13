import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getUniqueCourse = async ({
  courseId,
  userId = "-",
}: {
  courseId: string;
  userId?: string;
}) => {
  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    select: {
      id: true,
      image: true,
      name: true,
      presentation: true,
      users: {
        where: {
          userId,
        },
        select: {
          id: true,
          canceledAt: true,
        },
      },
      creator: {
        select: {
          image: true,
          name: true,
        },
      },
      lessons: {
        where: {
          state: {
            in: ["PUBLISHED", "PUBLIC"],
          },
        },
        orderBy: {
          rank: "asc",
        },
        select: {
          id: true,
          name: true,
          courseId: true,
          state: true,
          rank: true,
          users: {
            where: {
              userId,
            },
            select: {
              progress: true,
            },
          },
        },
      },
      _count: {
        select: {
          lessons: true,
          users: true,
        },
      },
    },
  });
  if (!course) {
    return null;
  }

  const lessons = course.lessons.map((lesson) => {
    const progress = lesson.users[0]?.progress ?? "NOT_STARTED";
    return {
      ...lesson,
      progress,
    };
  });

  return {
    ...course,
    isEnrolled: course.users.length > 0 && !course.users[0].canceledAt,
    isCanceled: course.users.length > 0 && !!course.users[0].canceledAt,
    lessons,
  };
};

export type CourseType = NonNullable<
  Prisma.PromiseReturnType<typeof getUniqueCourse>
>;

export type CourseLessonItem = CourseType["lessons"][0];

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
