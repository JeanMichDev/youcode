import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuthSession } from "@/lib/auth";
import { getMyCourse } from "../my-course.query";
import { LessonItem } from "./LessonItem";
import LessonNavigationCard from "./LessonNavigationCard";

export type LessonsNavigationProps = {
  courseId: string;
};

export const LessonNavigation = async (props: LessonsNavigationProps) => {
  const session = await getAuthSession();
  const course = await getMyCourse({
    courseId: props.courseId,
    userId: session?.user.id,
  });
  if (!course) return null;

  return <LessonNavigationCard course={course} />;
};
