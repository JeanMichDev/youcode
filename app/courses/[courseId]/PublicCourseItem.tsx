import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Typography } from "@/components/ui/Typography";
import { CourseType } from "./uniqueCourse.query";
import { MarkdownProse } from "@/features/mdx/MarkdownProse";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { SubmitButton } from "@/components/form/SubmitButton";
import { getRequiredAuthSession } from "@/lib/auth";

type CourseItemProps = {
  course: NonNullable<CourseType>;
  userId?: string;
  className?: string;
};
//on est sur qye uniqueCourse n'est pas null, on peut donc utiliser le type NonNullable
// La condition null est gérée dans page.tsx

export const PublicCourseItem = ({
  course,
  userId,
  className,
}: CourseItemProps) => {
  const isLogin = Boolean(userId);

  return (
    <div>
      <Card className={className}>
        <CardContent className="mt-4 flex flex-row gap-4">
          <Avatar className="mt-2">
            <AvatarFallback>{course.name[0]}</AvatarFallback>
            {course.image && (
              <AvatarImage
                className="size-14"
                src={course.image}
                alt={course.name}
              />
            )}
          </Avatar>
          <div>
            <Typography>{course.name}</Typography>
            <div className="mt-2 flex flex-row gap-2">
              <Avatar>
                <AvatarFallback>{course.creator.name?.[0]}</AvatarFallback>
                {course.creator.image && (
                  <AvatarImage
                    className="size-8 rounded-full"
                    src={course.creator.image}
                    alt={course.creator.name?.[0]}
                  />
                )}
              </Avatar>
              <div>{course.creator.name}</div>
            </div>
          </div>
        </CardContent>
        <CardContent>
          <Typography variant="h3">Presentation</Typography>
          <MarkdownProse markdown={course.presentation} />
        </CardContent>
      </Card>
      {course.isCanceled ? <p>You can't join this course.</p> : null}
      {!course.isCanceled && !course.isEnrolled && isLogin ? (
        <div>
          <form>
            <SubmitButton
              formAction={async () => {
                "use server";
                const session = await getRequiredAuthSession();
                const courseOnUser = await prisma.courseOnUser.create({
                  data: {
                    userId: session.user.id,
                    courseId: course.id,
                  },
                  select: {
                    course: {
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
                    },
                  },
                });
                const lesson = courseOnUser.course.lessons[0];
                revalidatePath(`/mycourses/${course.id}`);
                if (!lesson) {
                  return;
                }
                redirect(`/mycourses/${course.id}/lessons/${lesson.id}`);
              }}
            >
              Join
            </SubmitButton>
          </form>
        </div>
      ) : (
        redirect(`/mycourses/${course.id}`)
      )}
    </div>
  );
};
