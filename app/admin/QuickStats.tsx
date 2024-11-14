import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Typography } from "@/components/ui/Typography";
import { getRequiredAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { BookCheck, Presentation, User2 } from "lucide-react";

export type QuickStatsProps = {};
export const QuickStats = async (props: QuickStatsProps) => {
  const session = await getRequiredAuthSession();

  const users = await prisma.user.count({
    where: {
      ownedCourses: {
        some: {
          course: {
            creatorId: session.user.id,
          },
        },
      },
    },
  });

  const lessons = await prisma.lesson.count({
    where: {
      course: {
        creatorId: session.user.id,
      },
    },
  });

  const courses = await prisma.course.count({
    where: {
      creatorId: session.user.id,
    },
  });

  return (
    <Card>
      <CardHeader>Quick Stats</CardHeader>
      <CardContent>
        <Typography>
          <User2 className="inline" size={16} /> {users} Users
        </Typography>
        <Typography>
          <BookCheck className="inline" size={16} /> {courses} Courses
        </Typography>
        <Typography>
          <Presentation className="inline" size={16} /> {lessons} Lessons
        </Typography>
      </CardContent>
    </Card>
  );
};
