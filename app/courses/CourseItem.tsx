import React from "react";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Course, User } from "@prisma/client";
import { CoursesCard } from "./course.query";
import Link from "next/link";
import { Typography } from "@/components/ui/Typography";

export type CourseCardProps = {
  course: CoursesCard;
};

export const CourseItem = (props: CourseCardProps) => {
  const url = `/courses/${props.course.id}`;
  return (
    <Card>
      <CardContent className="mt-4 flex flex-row gap-4">
        <Avatar className="mt-2">
          <AvatarFallback>{props.course.name[0]}</AvatarFallback>
          {props.course.image && (
            <AvatarImage
              className="size-14"
              src={props.course.image}
              alt={props.course.name}
            />
          )}
        </Avatar>
        <div>
          <Typography as={Link} href={url}>
            {props.course.name}
          </Typography>
          <div className="mt-2 flex flex-row gap-2">
            <Avatar>
              <AvatarFallback>{props.course.creator.name?.[0]}</AvatarFallback>
              {props.course.creator.image && (
                <AvatarImage
                  className="size-8 rounded-full"
                  src={props.course.creator.image}
                  alt={props.course.creator.name?.[0]}
                />
              )}
            </Avatar>
            <div>{props.course.creator.name}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
