import {
  Layout,
  LayoutHeader,
  LayoutTitle,
  LayoutContent,
} from "@/components/layout/layout";
import { GoBackItem } from "@/features/pagination/GoBackItem";
import { getAllCourses } from "../courses/course.query";
import { CourseItem } from "./CourseItem";

export default async function PublicCoursePage() {
  const courses = await getAllCourses();

  return (
    <Layout>
      <GoBackItem url="/" />
      <LayoutHeader>
        <LayoutTitle>All Courses</LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="grid grid-cols-1 gap-4 sm:grid-cols-2 ">
        {courses.map((course) => {
          const url = `/courses/${course.id}`;
          return <CourseItem course={course} key={course.id} url={url} />;
        })}
      </LayoutContent>
    </Layout>
  );
}
