import { Layout } from "@/components/layout/layout";
import { getUniqueCourse } from "./uniqueCourse.query";
import { PublicLessonsItem } from "./PublicLessonsItem";
import { PublicCourseItem } from "./PublicCourseItem";

type CoursePage = {
  params: {
    courseId: string;
  };
};

export default async function PublicCourseIdPage({ params }: CoursePage) {
  const courseId = params.courseId;
  const uniqueCourse = await getUniqueCourse(courseId);

  if (!uniqueCourse) {
    return <div>Course not found</div>;
  }

  return (
    <Layout className="flex flex-row gap-4 ">
      <PublicCourseItem className="flex-[2]" uniqueCourse={uniqueCourse} />
      <PublicLessonsItem className="flex-1" lessons={uniqueCourse.lessons} />
    </Layout>
  );
}
