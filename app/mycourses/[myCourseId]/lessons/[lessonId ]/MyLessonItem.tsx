import { Lesson } from "@prisma/client";
import { CourseLessonItem } from "../../my-course.query";
import { CheckCircle, Circle, CircleDashed } from "lucide-react";
import { Typography } from "@/components/ui/Typography";
import Link from "next/link";

type MyLessonItemProps = {
  lesson: CourseLessonItem;
};

export const getLessonIcon = (status: CourseLessonItem["progress"]) => {
  if (status === "IN_PROGRESS") {
    return Circle;
  }
  if (status === "COMPLETED") {
    return CheckCircle;
  }
  return CircleDashed;
};

export const MyLessonItem = ({ lesson }: MyLessonItemProps) => {
  const Icon = getLessonIcon(lesson.progress);
  return (
    <Link href={`/mycourses/${lesson.courseId}/lessons/${lesson.id}`}>
      <div className="flex items-center justify-between gap-4 rounded-md border border-border bg-card px-4 py-2 transition-colors hover:bg-accent">
        <Icon size={16} />
        <Typography variant="small" className="flex-1">
          {lesson.name}
        </Typography>
      </div>
    </Link>
  );
};
