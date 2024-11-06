import { Lesson } from "@prisma/client";
import { CourseLessonItem } from "../../my-course.query";
import { CheckCircle, Circle, CircleDashed } from "lucide-react";
import { Typography } from "@/components/ui/Typography";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { getRequiredAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

type MyLessonItemProps = {
  lesson: CourseLessonItem;
};

export const getLessonIcon = (status: CourseLessonItem["progress"]) => {
  if (status === "IN_PROGRESS") {
    return Circle;
  }
  if (status === "COMPLETED") {
    return CheckCircle;
  }
  return CircleDashed;
};

export const MyLessonItem = ({ lesson }: MyLessonItemProps) => {
  const Icon = getLessonIcon(lesson.progress);
  return (
    <Link href={`/mycourses/${lesson.courseId}/lessons/${lesson.id}`}>
      <form>
        <Button
          variant="ghost"
          formAction={async () => {
            "use server";
            if (!lesson.id) return;
            const session = await getRequiredAuthSession();
            // Vérifier si l'utilisateur est déjà inscrit
            const existingEntry = await prisma.lessonOnUser.findUnique({
              where: {
                userId_lessonId: {
                  userId: session.user.id,
                  lessonId: lesson.id,
                },
              },
            });
            // Ajouter si l'entrée n'existe pas
            if (!existingEntry) {
              const updateLesson = await prisma.lessonOnUser.create({
                data: {
                  userId: session.user.id,
                  lessonId: lesson.id,
                  progress: "NOT_STARTED",
                },
              });
              console.log("updateLesson", updateLesson);
            }
            redirect(`/mycourses/${lesson.courseId}/lessons/${lesson.id}`);
          }}
        >
          <div className="flex items-center justify-between gap-4 rounded-md border border-border bg-card px-4 py-2 transition-colors hover:bg-accent">
            <Icon size={16} />
            <Typography variant="small" className="flex-1">
              {lesson.name}
            </Typography>
          </div>
        </Button>
      </form>
    </Link>
  );
};
