import { getMyCourse } from "./my-course.query";
import { getAuthSession } from "@/lib/auth";
import { notFound } from "next/navigation";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { GoBackItem } from "@/features/pagination/GoBackItem";
import { MyCourse } from "./MyCourses";

type MyCoursePageProps = {
  params: {
    myCourseId: string;
  };
};

export default async function MyCoursePage({ params }: MyCoursePageProps) {
  const myCourseId = params.myCourseId;
  const session = await getAuthSession();
  const myCourse = await getMyCourse({
    courseId: myCourseId,
    userId: session?.user.id,
  });

  if (!myCourse) notFound();


  return (
    <Layout>
      <GoBackItem url="/mycourses" />
      <LayoutHeader>
        <LayoutTitle>My courses</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <MyCourse course={myCourse} />
      </LayoutContent>
    </Layout>
  );
}
