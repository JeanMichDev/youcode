import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Typography } from "@/components/ui/Typography";
import { MarkdownProse } from "@/features/mdx/MarkdownProse";
import { CourseType } from "./my-course.query";
import { MyLessonItem } from "./lessons/[lessonId]/MyLessonItem";
export type CourseProps = {
  course: CourseType;
};
export const MyCourse = ({ course }: CourseProps) => {
  return (
    <div className="flex  flex-col items-start gap-4 lg:flex-row">
      <Card className="flex-[2] hover:bg-accent">
        <CardHeader className="flex flex-row gap-3 space-y-0">
          <Avatar className="size-14 rounded">
            <AvatarFallback>{course.name[0]}</AvatarFallback>
            {course.image ? <AvatarImage src={course.image} /> : null}
          </Avatar>
          <div className="flex flex-col gap-3">
            <CardTitle>{course.name}</CardTitle>
            <div className="flex flex-row gap-2">
              <Avatar className="size-8">
                <AvatarFallback>{course.name[0]}</AvatarFallback>
                {course.creator.image ? (
                  <AvatarImage src={course.creator.image} />
                ) : null}
              </Avatar>
              <Typography variant="large" className=" text-muted-foreground">
                {course.creator.name}
              </Typography>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <MarkdownProse markdown={course.presentation} />
        </CardContent>
      </Card>
      <Card className="min-h-full flex-1 overflow-y-scroll">
        <CardHeader className="sticky top-0 z-10 bg-card">
          <CardTitle>Lessons</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-2 ">
          {course.lessons.length === 0 ? (
            <p>No lessons published yet</p>
          ) : (
            course.lessons.map((lesson) => (
              <MyLessonItem lesson={lesson} key={lesson.id} />
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};
