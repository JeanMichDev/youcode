import { Badge } from "@/components/ui/badge";
import { Typography } from "@/components/ui/Typography";
import React from "react";
import { AdminLessonItemType } from "./lesson.query";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Menu } from "lucide-react";

export type LessonItemProps = {
  lesson: AdminLessonItemType;
  index: number;
};

export const LessonItem = ({ lesson }: LessonItemProps) => {
  const url = `/admin/courses/${lesson.courseId}/lessons/${lesson.id}`;
  return (
    <div className=" flex items-center gap-2 rounded border border-border bg-card px-4 py-2 transition-colors hover:bg-accent">
      <Typography>{lesson.name}</Typography>
      <Badge className="ml-auto">{lesson.state}</Badge>
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

export function AdminLessonItemSortable({ lesson, index }: LessonItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    activeIndex,
  } = useSortable({ id: lesson.id });
  const url = `/admin/courses/${lesson.courseId}/lessons/${lesson.id}`;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: index === activeIndex ? 50 : undefined, // fait en sorte que l'élément en cours de déplacement soit au dessus des autres
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <Link href={url}>
        <div className=" flex items-center gap-2 rounded border border-border bg-card px-4 py-2 transition-colors hover:bg-accent">
          <Typography>{lesson.name}</Typography>
          <Badge className="ml-auto">{lesson.state}</Badge>
          <div
            onClickCapture={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <Button
              size="sm"
              className="cursor-move"
              variant="ghost"
              {...listeners} //le composant qui reçoit {...listeners} est celui qui pourra déclencher le drag and drop du parent lors du hover
            >
              <Menu size={16} />
            </Button>
          </div>
        </div>
      </Link>
    </div>
    //
  );
}
