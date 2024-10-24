import { getRequiredAuthSession } from "@/lib/auth";
import { getAdminLesson } from "./admin-lesson.query";
import { AdminLessonForm } from "./AdminLessonForm";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GoBackItem } from "@/features/pagination/GoBackItem";

type AdminLessonPageProps = {
  params: {
    lessonId: string;
  };
};

export default async function AdminLessonPage({
  params,
}: AdminLessonPageProps) {
  const session = await getRequiredAuthSession();
  const lesson = await getAdminLesson(params.lessonId, session.user.id);
  const urlBack = `/admin/courses/${lesson?.courseId}/lessons`;

  if (!session) return <p>You must be connected</p>;

  if (!lesson) return <p>Lesson not found</p>;

  return (
    <Layout>
      <LayoutHeader>
        <GoBackItem url={urlBack} />
        <LayoutTitle>Edit Lesson</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <Card>
          <CardContent>
            <AdminLessonForm defaultValue={lesson} />
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
