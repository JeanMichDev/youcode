import { Card, CardContent } from "@/components/ui/card";
import { Typography } from "@/components/ui/Typography";
import { CourseType } from "./uniqueCourse.query";

type LessonsItemProps = {
  lessons: NonNullable<CourseType>["lessons"];
  className?: string;
};

export const PublicLessonsItem = ({ lessons, className }: LessonsItemProps) => {
  return (
    <Card className={className}>
      <CardContent>
        <Typography variant="h3" className="mt-4">
          Lessons
        </Typography>
      </CardContent>
      <CardContent>
        <div className="rounded-md bg-background px-4 py-2">
          {lessons.length > 0 // Pas possible d'utiliser la condition !lessons à cause du type NonNullable
            ? lessons
                .sort((a, b) => Number(a.rank) - Number(b.rank))
                .map((lesson) => {
                  return (
                    <Typography variant="p" key={lesson.id}>
                      {lesson.name}
                    </Typography>
                  );
                })
            : "No lessons"}
        </div>
      </CardContent>
    </Card>
  );
};
