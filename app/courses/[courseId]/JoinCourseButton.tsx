import { Button } from "@/components/ui/button";
import { getRequiredAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

type JoinCourseButtonProps = {
  courseId: string;
};

export const JoinCourseButton = async ({ courseId }: JoinCourseButtonProps) => {
  const session = await getRequiredAuthSession();
  const userSession = session.user.id;
  return (
    <form>
      <Button
        variant="default"
        size="lg"
        formAction={async () => {
          "use server";
          // on vérifie que le user n'est pas déjà inscrit
          const courseOnUser = await prisma.courseOnUser.findUnique({
            where: {
              userId_courseId: {
                userId: userSession,
                courseId,
              },
            },
          });
          if (courseOnUser) {
            throw new Error("User already joined course");
          }
          await prisma.courseOnUser.create({
            data: {
              userId: userSession,
              courseId,
              createdAt: new Date().toISOString(),
            },
          });

          //on récupère les leçons du cours

          const lessons = await prisma.lesson.findMany({
            where: {
              id: courseId,
            },
            select: {
              id: true,
            },
          });

          // on créer les relations entre l'utilisateur et les leçons du cours

          await Promise.all(
            lessons.map(async (lesson) => {
              await prisma.lessonOnUser.create({
                data: {
                  userId: userSession,
                  lessonId: lesson.id,
                  progress: "NOT_STARTED",
                  createdAt: new Date(),
                },
              });
              console.log("Lesson created on user");
            })
          );

          // on récupère la première leçon du cours

          const firstLesson = await prisma.lesson.findFirst({
            where: {
              courseId,
            },
            select: {
              id: true,
            },
            orderBy: {
              rank: "asc",
            },
          });

          if (firstLesson) {
            console.log("firstLesson", firstLesson);
            redirect(`/mycourses/${courseId}/lessons/${firstLesson?.id}`);
          } else {
            redirect(`/mycourses/${courseId}`);
          }
        }}
        // on redirige l'utilisateur vers la première leçon du cours
      >
        Join Course
      </Button>
    </form>
  );
};
