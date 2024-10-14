import { Layout, LayoutContent } from "@/components/layout/layout";
import { getUniqueCourse } from "./uniqueCourse.query";
import { PublicLessonsItem } from "./PublicLessonsItem";
import { PublicCourseItem } from "./PublicCourseItem";
import { GoBackItem } from "@/features/pagination/GoBackItem";
import { notFound } from "next/navigation";

type CoursePage = {
  params: {
    courseId: string;
  };
};

export default async function PublicCourseIdPage({ params }: CoursePage) {
  const courseId = params.courseId;
  const uniqueCourse = await getUniqueCourse(courseId);

  if (!uniqueCourse) notFound();

  return (
    <Layout>
      <GoBackItem url="/courses" />
      <LayoutContent className="flex flex-row gap-4 ">
        <PublicCourseItem className="flex-[2]" uniqueCourse={uniqueCourse} />
        <PublicLessonsItem className="flex-1" lessons={uniqueCourse.lessons} />
      </LayoutContent>
    </Layout>
  );
}
