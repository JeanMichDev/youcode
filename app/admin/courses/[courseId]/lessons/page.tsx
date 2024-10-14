import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { getRequiredAuthSession } from "@/lib/auth";
import { getCourseLesson } from "./lesson.query";
import Link from "next/link";
import { ArrowBigLeft } from "lucide-react";
import { LessonItem } from "./AdminLessonMenu";
import { notFound } from "next/navigation";
import { GoBackItem } from "@/features/pagination/GoBackItem";

type LessonPageProps = {
  params: {
    courseId: string;
  };
};

export default async function LessonPage({ params }: LessonPageProps) {
  const { courseId } = params;
  const session = await getRequiredAuthSession();
  const courses = await getCourseLesson({
    courseId: params.courseId,
    userId: session.user.id,
  });
  const url = `/admin/courses/${courseId}`;

  if (!courses) {
    notFound();
  }

  return (
    <Layout>
      <LayoutHeader>
        <GoBackItem url="/admin/courses" />
        <LayoutTitle>Lesson . {courses.name} </LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <Card>
          <CardHeader>
            <CardTitle></CardTitle>
          </CardHeader>
          <CardContent>
            {courses.lessons.map((lesson) => {
              return <LessonItem key={lesson.id} lesson={lesson} />;
            })}
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
