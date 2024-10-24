import { Badge } from "@/components/ui/badge";
import { Typography } from "@/components/ui/Typography";
import React from "react";
import { AdminLessonItemType } from "./lesson.query";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export type LessonItemProps = {
  lesson: AdminLessonItemType;
};

export const LessonItem = (props: LessonItemProps) => {
  const url = `/admin/courses/${props.lesson.courseId}/lessons/${props.lesson.id}`;
  return (
    <div className=" flex items-center gap-2 rounded border border-border bg-card px-4 py-2 transition-colors hover:bg-accent">
      <Typography>{props.lesson.name}</Typography>
      <Badge className="ml-auto">{props.lesson.state}</Badge>
      <Link
        href={url}
        className={buttonVariants({
          variant: "secondary",
        })}
      >
        Edit lesson
      </Link>
    </div>
  );
};
