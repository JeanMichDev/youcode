import { notFound, useRouter } from "next/navigation";
import { CourseDialog } from "./CourseDialog";
import { getAuthSession } from "@/lib/auth";
import { getMyCourse } from "../../../mycourses/[myCourseId]/my-course.query";
import { MyCourse } from "../../../mycourses/[myCourseId]/MyCourses";

export default async function Modal({
  params,
}: {
  params: { courseId: string };
}) {
  console.log("Modal");
  const session = await getAuthSession();
  const course = await getMyCourse({
    courseId: params.courseId,
    userId: session?.user.id,
  });
  if (!course) {
    notFound();
  }

  return (
    <CourseDialog course={course}>
      <MyCourse course={course} />
    </CourseDialog>
  );
}
