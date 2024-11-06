import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LessonIdType } from "./lessonId.query";
import { Typography } from "@/components/ui/Typography";
import { getLessonIcon } from "./MyLessonItem";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { revalidatePath } from "next/cache";
import { Layout } from "@/components/layout/layout";

type LessonIdProps = {
  lesson: LessonIdType;
  userId: string;
};

export const LessonId = ({ lesson, userId }: LessonIdProps) => {
  const Icon = getLessonIcon(lesson.progress);
  let progress;
  switch (lesson.progress) {
    case "NOT_STARTED":
      progress = "Not Started";
      break;
    case "IN_PROGRESS":
      progress = "In Progress";
      break;
    case "COMPLETED":
      progress = "Completed";
      break;
    default:
      progress = "Not Started";
  }

  return (
    <Layout>
      <div className="flex flex-row items-start gap-4 lg:flex-row">
        <Card className="flex-1">
          <CardHeader>{lesson.course?.name}</CardHeader>
          <CardContent>
            <div className="flex items-center justify-between gap-4 rounded-md border border-border bg-card px-4 py-2 transition-colors hover:bg-accent">
              <Icon size={16} />
              <Typography variant="small" className="flex-1">
                {lesson.name}
              </Typography>
            </div>
          </CardContent>
        </Card>
        <Card className="flex-[4]">
          <CardHeader>
            <CardTitle>{lesson.name}</CardTitle>
          </CardHeader>
          <CardContent>{lesson.content}</CardContent>
        </Card>
      </div>
      <div className="ml-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default" size="lg">
              {progress}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom">
            <DropdownMenuItem asChild>
              <form>
                <Button
                  variant="default"
                  size="lg"
                  formAction={async () => {
                    "use server";
                    if (!lesson.id) return;
                    await prisma.lessonOnUser.update({
                      where: {
                        userId_lessonId: {
                          userId,
                          lessonId: lesson.id,
                        },
                      },
                      data: {
                        progress: "NOT_STARTED",
                      },
                    });
                    revalidatePath(
                      `/mycourses/${lesson.course?.id}/lessons/${lesson.id}`
                    );
                  }}
                >
                  Not Started
                </Button>
              </form>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <form>
                <Button
                  variant="default"
                  size="lg"
                  formAction={async () => {
                    "use server";
                    if (!lesson.id) return;
                    await prisma.lessonOnUser.update({
                      where: {
                        userId_lessonId: {
                          userId,
                          lessonId: lesson.id,
                        },
                      },
                      data: {
                        progress: "IN_PROGRESS",
                      },
                    });
                    revalidatePath(
                      `/mycourses/${lesson.course?.id}/lessons/${lesson.id}`
                    );
                  }}
                >
                  In Progress
                </Button>
              </form>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <form>
                <Button
                  variant="default"
                  size="lg"
                  formAction={async () => {
                    "use server";
                    if (!lesson.id) return;
                    await prisma.lessonOnUser.update({
                      where: {
                        userId_lessonId: {
                          userId,
                          lessonId: lesson.id,
                        },
                      },
                      data: {
                        progress: "COMPLETED",
                      },
                    });
                    revalidatePath(
                      `/mycourses/${lesson.course?.id}/lessons/${lesson.id}`
                    );
                  }}
                >
                  Completed
                </Button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Layout>
  );
};
