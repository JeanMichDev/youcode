import { prisma } from "@/lib/prisma";

export const getAdminLesson = async (lessonId: string, userId: string) => {
  const lesson = await prisma.lesson.findUnique({
    where: {
      // on s'assure que la lesson appartient bien au cours
      id: lessonId,
      course: {
        creatorId: userId,
      },
    },
    select: {
      id: true,
      name: true,
      content: true,
      state: true,
      courseId: true,
      rank: true,
    },
  });
  return lesson;
};

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
// enum LessonState {
//   HIDDEN
//   PUBLISHED
//   PUBLIC
// }
