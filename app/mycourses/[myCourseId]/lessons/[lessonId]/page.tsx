import { SubmitButton } from "@/components/form/SubmitButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuthSession, getRequiredAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

import { handleLessonState } from "./lesson.action";
import { getLesson } from "./lessonId.query";
import { MdxProse } from "./MdxRemote";
import { PanelRightClose } from "lucide-react";
import { Button } from "react-day-picker";
import { OpenLessonNavigationButton } from "./OpenLessonNavigationButton";

export default async function LessonPage({
  params: { lessonId, myCourseId },
}: {
  params: {
    lessonId: string;
    myCourseId: string;
  };
}) {
  const session = await getRequiredAuthSession();
  const lesson = await getLesson(lessonId, session?.user.id);
  console.log("lesson :", lesson);

  if (!lesson) {
    console.log("lesson not found", lesson);
    notFound();
  }

  const isAuthorized = await prisma.course.findUnique({
    where: {
      id: myCourseId,
    },
    select: {
      users: {
        where: {
          userId: session.user.id ?? "-",
          canceledAt: null,
        },
      },
    },
  });

  if (lesson.state !== "PUBLIC" && !isAuthorized?.users.length) {
    throw new Error("Unauthorized");
  }

  if (lesson.users.length === 0 && session?.user.id) {
    console.log("lessonOnUser.create in page lessonId");
    await prisma.lessonOnUser.create({
      data: {
        userId: session?.user.id,
        lessonId: lesson.id,
      },
    });
  }

  return (
    <Card className="flex-1">
      <CardHeader className="flex-row items-center gap-2 space-y-0">
        <CardTitle>{lesson.name}</CardTitle>
        <OpenLessonNavigationButton className="ml-auto" />
      </CardHeader>
      <CardContent className="">
        <MdxProse markdown={lesson.content} />

        <form className="m-auto flex max-w-2xl flex-row-reverse">
          <SubmitButton
            formAction={async () => {
              "use server";

              await handleLessonState({
                lessonId: lesson.id,
                progress:
                  lesson.progress === "COMPLETED" ? "IN_PROGRESS" : "COMPLETED",
              });
            }}
          >
            {lesson.progress === "COMPLETED"
              ? "Mark as in progress"
              : "Completed"}
          </SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
}
