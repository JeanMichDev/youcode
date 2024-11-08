import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader } from "@/components/ui/loader";
import { Skeleton } from "@/components/ui/skeleton";
import { LessonItemPlaceholder } from "./lessons/[lessonId]/MyLessonItemPlaceholder";

export default function MyCoursePlaceholder() {
  return (
    <div className="flex  flex-col items-start gap-4 lg:flex-row">
      <Card className="flex-[2] hover:bg-accent">
        <CardHeader className="flex flex-row gap-3 space-y-0">
          <Avatar className="size-14 rounded">
            <AvatarFallback>
              <Loader />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-3">
            <Skeleton className="h-5 w-56" />

            <div className="flex flex-row gap-2">
              <Avatar className="size-8">
                <AvatarFallback>
                  <Loader />
                </AvatarFallback>
              </Avatar>
              <Skeleton className="h-9 w-20" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>
      <Card className="min-h-full flex-1 overflow-y-scroll">
        <CardHeader className="sticky top-0 z-10 bg-card">
          <Skeleton className="h-5 w-32" />
        </CardHeader>
        <CardContent className="flex flex-col gap-2 ">
          {Array.from({ length: 5 }).map((_, i) => (
            <LessonItemPlaceholder key={i} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
