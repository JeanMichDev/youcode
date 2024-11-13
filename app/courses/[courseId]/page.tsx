import { Layout, LayoutContent } from "@/components/layout/layout";
import { getUniqueCourse } from "./uniqueCourse.query";
import { PublicLessonsItem } from "./PublicLessonsItem";
import { PublicCourseItem } from "./PublicCourseItem";
import { GoBackItem } from "@/features/pagination/GoBackItem";
import { notFound } from "next/navigation";
import { JoinCourseButton } from "./JoinCourseButton";
import { getCourseOnUser } from "./getCourseOnUser";
import { Button } from "@/components/ui/button";
import { getAuthSession } from "@/lib/auth";

type CoursePage = {
  params: {
    courseId: string;
  };
};

export default async function PublicCourseIdPage({ params }: CoursePage) {
  const courseId = params.courseId;
  const session = await getAuthSession();
  const uniqueCourse = await getUniqueCourse({
    courseId: courseId,
    userId: session?.user.id,
  });
  const isUserOnCourse = await getCourseOnUser(courseId);

  if (!uniqueCourse) notFound();

  return (
    <Layout>
      <GoBackItem url="/courses" />
      <LayoutContent className="flex flex-row gap-4 ">
        <PublicCourseItem
          className="flex-[2]"
          course={uniqueCourse}
          userId={session?.user.id}
        />
        <PublicLessonsItem className="flex-1" lessons={uniqueCourse.lessons} />
      </LayoutContent>
    </Layout>
  );
}
