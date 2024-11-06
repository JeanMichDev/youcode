import { getAuthSession } from "@/lib/auth";
import { notFound } from "next/navigation";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { GoBackItem } from "@/features/pagination/GoBackItem";
import { getLesson } from "./lessonId.query";
import { LessonId } from "./LessonId";

type LessonIdPageProps = {
  params: {
    myCourseId: string;
    lessonId: string;
  };
};

export default async function LessonIdPage({ params }: LessonIdPageProps) {
  const lessonId = params.lessonId;
  const session = await getAuthSession();

  if (!session?.user.id) notFound();

  const lesson = await getLesson({
    lessonId: lessonId,
    userId: session.user.id,
  });

  if (!lesson) notFound();

  return (
    <Layout>
      <GoBackItem url={`/mycourses/${lesson.course?.id}`} />
      <LayoutContent>
        <LessonId lesson={lesson} userId={session.user.id} />
      </LayoutContent>
    </Layout>
  );
}
