import { Button } from "@/components/ui/button";
import { getRequiredAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { CourseType } from "./uniqueCourse.query";
import { revalidatePath } from "next/cache";

type JoinCourseButtonProps = {
  course: CourseType;
};

export const JoinCourseButton = async ({ course }: JoinCourseButtonProps) => {
  return (
    <form>
      <Button
        variant="default"
        size="lg"
        formAction={async () => {
          "use server";
          const session = await getRequiredAuthSession();

          const toLinkCourse = await prisma.course.findUnique({
            where: {
              id: course.id,
            },
            select: {
              id: true,
              lessons: {
                orderBy: {
                  rank: "asc",
                },
                take: 1,
                select: {
                  id: true,
                },
              },
            },
          });

          if (!toLinkCourse) {
            return;
          }

          await prisma.courseOnUser.create({
            data: {
              userId: session.user.id,
              courseId: course.id,
            },
            select: {
              id: true,
            },
          });

          const lesson = toLinkCourse.lessons[0];

          revalidatePath(`/courses/${course.id}`);

          if (!lesson) {
            return;
          }

          redirect(`/courses/${course.id}/lessons/${lesson.id}`);
        }}
      >
        Join Course
      </Button>
    </form>
  );
};
