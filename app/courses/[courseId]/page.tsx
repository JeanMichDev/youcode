import { Layout, LayoutContent } from "@/components/layout/layout";
import { getUniqueCourse } from "./uniqueCourse.query";
import { PublicLessonsItem } from "./PublicLessonsItem";
import { PublicCourseItem } from "./PublicCourseItem";
import { GoBackItem } from "@/features/pagination/GoBackItem";
import { notFound } from "next/navigation";
import { JoinCourseButton } from "./JoinCourseButton";
import { getCourseOnUser } from "./getCourseOnUser";
import { Button } from "@/components/ui/button";

type CoursePage = {
  params: {
    courseId: string;
  };
};

export default async function PublicCourseIdPage({ params }: CoursePage) {
  const courseId = params.courseId;
  const uniqueCourse = await getUniqueCourse(courseId);
  const isUserOnCourse = await getCourseOnUser(courseId);

  if (!uniqueCourse) notFound();

  return (
    <Layout>
      <GoBackItem url="/courses" />
      <LayoutContent className="flex flex-row gap-4 ">
        <PublicCourseItem className="flex-[2]" uniqueCourse={uniqueCourse} />
        <PublicLessonsItem className="flex-1" lessons={uniqueCourse.lessons} />
      </LayoutContent>
      <LayoutContent>
        {isUserOnCourse ? (
          <Button variant="ghost" size="lg">
            Already Joined
          </Button>
        ) : (
          <JoinCourseButton courseId={courseId} />
        )}
      </LayoutContent>
    </Layout>
  );
}
