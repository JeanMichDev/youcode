import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Typography } from "@/components/ui/Typography";
import { UniqueCourse } from "./uniqueCourse.query";
import { MarkdownProse } from "@/features/mdx/MarkdownProse";

type CourseItemProps = {
  uniqueCourse: NonNullable<UniqueCourse>;
  className?: string;
};
//on est sur qye uniqueCourse n'est pas null, on peut donc utiliser le type NonNullable
// La condition null est gérée dans page.tsx

export const PublicCourseItem = ({
  uniqueCourse,
  className,
}: CourseItemProps) => {
  return (
    <Card className={className}>
      <CardContent className="mt-4 flex flex-row gap-4">
        <Avatar className="mt-2">
          <AvatarFallback>{uniqueCourse.name[0]}</AvatarFallback>
          {uniqueCourse.image && (
            <AvatarImage
              className="size-14"
              src={uniqueCourse.image}
              alt={uniqueCourse.name}
            />
          )}
        </Avatar>
        <div>
          <Typography>{uniqueCourse.name}</Typography>
          <div className="mt-2 flex flex-row gap-2">
            <Avatar>
              <AvatarFallback>{uniqueCourse.creator.name?.[0]}</AvatarFallback>
              {uniqueCourse.creator.image && (
                <AvatarImage
                  className="size-8 rounded-full"
                  src={uniqueCourse.creator.image}
                  alt={uniqueCourse.creator.name?.[0]}
                />
              )}
            </Avatar>
            <div>{uniqueCourse.creator.name}</div>
          </div>
        </div>
      </CardContent>
      <CardContent>
        <Typography variant="h3">Presentation</Typography>
        <MarkdownProse markdown={uniqueCourse.presentation} />
      </CardContent>
    </Card>
  );
};
