import { getAllCourses } from "../courses/course.query";
import { getAuthSession } from "@/lib/auth";
import { CourseItem } from "../courses/CourseItem";
import { GoBackItem } from "@/features/pagination/GoBackItem";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { UnauthAlert } from "@/features/auth/UnauthAlert";

export default async function MyCoursesPage() {
  const session = await getAuthSession();

  if (!session?.user.id) {
    return <UnauthAlert />;
  }

  const myCourses = await getAllCourses(session.user.id);
  console.log("myCourses", myCourses);

  return (
    <Layout>
      <GoBackItem url="/" />
      <LayoutHeader>
        <LayoutTitle>My Courses</LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="grid grid-cols-1 gap-4 sm:grid-cols-2 ">
        {myCourses.map((course) => {
          const url = `/mycourses/${course.id}`;
          return <CourseItem course={course} key={course.id} url={url} />;
        })}
      </LayoutContent>
    </Layout>
  );
}
