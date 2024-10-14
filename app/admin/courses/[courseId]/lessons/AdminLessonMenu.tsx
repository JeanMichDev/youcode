import { Badge } from "@/components/ui/badge";
import { Typography } from "@/components/ui/Typography";
import React from "react";
import { AdminLessonItemType } from "./lesson.query";

export type LessonItemProps = {
  lesson: AdminLessonItemType;
};

export const LessonItem = (props: LessonItemProps) => {
  return (
    <div className=" flex items-center gap-2 rounded border border-border bg-card px-4 py-2 transition-colors hover:bg-accent">
      <Typography>{props.lesson.name}</Typography>
      <Badge className="ml-auto">{props.lesson.state}</Badge>
    </div>
  );
};
