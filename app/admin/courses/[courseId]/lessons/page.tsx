import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { getRequiredAuthSession } from "@/lib/auth";
import { getCourseLesson } from "./lesson.query";
import { notFound, redirect } from "next/navigation";
import { GoBackItem } from "@/features/pagination/GoBackItem";
import { SubmitButton } from "@/components/form/SubmitButton";
import { prisma } from "@/lib/prisma";
import { AdminLessonSortable } from "./AdminLessonSortable";

type LessonPageProps = {
  params: {
    courseId: string;
  };
};

export default async function LessonPage({ params }: LessonPageProps) {
  const { courseId } = params;
  const session = await getRequiredAuthSession();
  const courses = await getCourseLesson({
    courseId: courseId,
    userId: session.user.id,
  });
  const urlBack = `/admin/courses/${courseId}`;

  if (!courses) {
    notFound();
  }

  return (
    <Layout>
      <LayoutHeader>
        <GoBackItem url={urlBack} />
        <LayoutTitle>Course : {courses.name} </LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <Card>
          <CardHeader>
            <CardTitle></CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <AdminLessonSortable items={courses.lessons} />
          </CardContent>
          <CardContent>
            <form>
              <SubmitButton
                size="sm"
                variant="secondary"
                className="w-full"
                formAction={async () => {
                  "use server";
                  const session = await getRequiredAuthSession();
                  const courseId = params.courseId;
                  //on autorise l'utilisateur
                  await prisma.course.findFirstOrThrow({
                    where: {
                      id: courseId,
                      creatorId: session.user.id,
                    },
                  });
                  const lesson = await prisma.lesson.create({
                    data: {
                      name: "Draft Lesson",
                      rank: "aaaa",
                      content: "Lesson content",
                      state: "HIDDEN",
                      courseId: courseId,
                    },
                  });
                  redirect(`/admin/courses/${courseId}/lessons/${lesson.id}`);
                }}
              >
                Create Lesson
              </SubmitButton>
            </form>
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
