"use client";
import React, { PropsWithChildren } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePathname, useRouter } from "next/navigation";
import { CoursesCard } from "../../../courses/course.query";

export type CourseDialogProps = PropsWithChildren<{
  course: CoursesCard;
}>;

export const CourseDialog = (props: CourseDialogProps) => {
  const router = useRouter();
  const pathname = usePathname();

  //filter(Boolean) removes falsy values from an array
  const isCoursePage = pathname?.split("/").filter(Boolean).length === 2;

  console.log("pathname from Course Dialog", pathname);
  console.log("is course page open", isCoursePage);

  return (
    <Dialog open={isCoursePage} onOpenChange={() => router.back()}>
      <DialogContent className="max-h-screen max-w-3xl overflow-auto">
        <DialogHeader>
          <DialogTitle>{props.course.name}</DialogTitle>
        </DialogHeader>
        {props.children}
      </DialogContent>
    </Dialog>
  );
};
