import { prisma } from "@/lib/prisma";

export const getCourseLesson = async ({
  courseId,
  userId,
}: {
  courseId: string;
  userId: string;
}) => {
  const courses = await prisma.course.findFirst({
    // permet une vérification double
    where: {
      id: courseId,
      creatorId: userId,
    },
    select: {
      id: true,
      name: true,
      lessons: true,
    },
  });
  return courses;
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
