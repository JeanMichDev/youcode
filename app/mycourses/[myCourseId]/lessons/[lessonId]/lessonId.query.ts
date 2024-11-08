import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

type getLessonProps = {
  lessonId: string;
  userId: string;
};

export const getLesson = async ({ lessonId, userId }: getLessonProps) => {
  //on commence par vérifier si il existe un lien entre l'utilisateur et la leçon

  const lessonOnUser = await prisma.lessonOnUser.findUnique({
    where: {
      userId_lessonId: {
        userId,
        lessonId,
      },
    },
  });

  // si c'est le cas, on récupère les données de la leçon

  const lessonData = await prisma.lesson.findUnique({
    where: {
      id: lessonId,
    },
    select: {
      id: true,
      name: true,
      content: true,
      state: true,
      course: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });

  // on combine les données de la leçon avec les données de la relation entre l'utilisateur et la leçon

  return {
    ...lessonData,
    progress: lesson.progress,
  };
};

export type LessonIdType = NonNullable<
  Prisma.PromiseReturnType<typeof getLesson>
>;

//  model Lesson {
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
// model LessonOnUser {
//   id        String   @id @default(cuid())
//   userId    String
//   lessonId  String
//   progress  Progress @default(NOT_STARTED)
//   createdAt DateTime @default(now())
//   user   User   @relation(fields: [userId], references: [id])
//   lesson Lesson @relation(fields: [lessonId], references: [id])
//   @@unique([userId, lessonId])
// }
// enum Progress {
//   NOT_STARTED
//   IN_PROGRESS
//   COMPLETED
// }
