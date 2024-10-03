import { getRequiredAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  Layout,
  LayoutActions,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableHeader,
} from "@/components/ui/table";
import { ArrowBigLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Typography } from "@/components/ui/Typography";

export default async function CoursesPage() {
  const session = await getRequiredAuthSession();
  const courses = await prisma.course.findMany({
    where: {
      creatorId: session.user.id,
    },
  });
  const keysOfCourse = courses[0] ? Object.keys(courses[0]) : [];

  return (
    <Layout>
      <LayoutHeader>
        <Link href="/admin">
          <ArrowBigLeft size={24} />
        </Link>
        <LayoutTitle>My Courses</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image ou ID</TableHead>
                  <TableHead>Name</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.map((course) => {
                  return (
                    <TableRow>
                      <TableCell>
                        <Avatar>
                          <AvatarFallback>{course.name[0]}</AvatarFallback>
                          {course.image && (
                            <AvatarImage src={course.image} alt={course.name} />
                          )}
                        </Avatar>
                      </TableCell>
                      <TableCell>
                        <Typography
                          as={Link}
                          variant="large"
                          href={`/admin/courses/${course.id}`}
                        >
                          {course.name}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
