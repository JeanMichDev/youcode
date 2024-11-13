"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import React from "react";
import { LessonItem } from "./LessonItem";
import { CourseType } from "../my-course.query";
import {
  useLessonNavigationState,
  useLessonNavigationStore,
} from "./lesson-navigation.store";
import { Button } from "@/components/ui/button";
import {
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
  Sheet,
} from "@/components/ui/sheet";
import { Label } from "@radix-ui/react-dropdown-menu";
import { OpenLessonNavigationButton } from "./[lessonId]/OpenLessonNavigationButton";

export default function LessonNavigationCard({
  course,
}: {
  course: CourseType;
}) {
  const setState = useLessonNavigationStore((s) => s.setState); // syntaxe pour récupérer que la méthode setState du store
  const state = useLessonNavigationState();

  if (state === "sticky") {
    return (
      <Card className="max-w-xs flex-1">
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle>Lessons</CardTitle>
          <Button
            onClick={() => setState("close")}
            size="sm"
            variant="ghost"
            className="hidden lg:block"
          >
            <PanelRightClose />
          </Button>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {course.lessons.map((lesson) => (
            <LessonItem key={lesson.id} lesson={lesson} />
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Sheet open={state === "open"} onOpenChange={() => setState("close")}>
      <SheetContent side="right">
        <SheetHeader>
          <Button onClick={() => setState("sticky")} size="sm" variant="ghost">
            <PanelLeftClose />
          </Button>
          <SheetTitle>Lessons</SheetTitle>
        </SheetHeader>
        <ul
          className="my-8 flex flex-col gap-2"
          onClick={() => {
            setState("close");
          }}
        >
          {course.lessons.map((lesson) => (
            <LessonItem key={lesson.id} lesson={lesson} />
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
