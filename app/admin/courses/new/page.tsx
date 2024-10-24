import {
  Layout,
  LayoutActions,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GoBackItem } from "@/features/pagination/GoBackItem";
import { CourseForm } from "../[courseId]/edit/CourseForm";

export default async function NewCoursePage() {
  return (
    <Layout>
      <LayoutHeader>
        <GoBackItem url="/admin/courses" />
        <LayoutTitle>New course</LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="flex flex-col gap-4 lg:flex-row">
        <Card>
          <CardContent className="mt-6">
            <CourseForm />
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
