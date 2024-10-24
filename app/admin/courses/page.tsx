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
import { Card, CardContent } from "@/components/ui/card";

import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Typography } from "@/components/ui/Typography";
import { GoBackItem } from "@/features/pagination/GoBackItem";
import { buttonVariants } from "@/components/ui/button";

export default async function CoursesPage() {
  const session = await getRequiredAuthSession();
  const courses = await prisma.course.findMany({
    where: {
      creatorId: session.user.id,
    },
  });

  return (
    <Layout>
      <LayoutHeader>
        <GoBackItem url="/admin" />
        <div className="flex w-full justify-between">
          <LayoutTitle>My Courses</LayoutTitle>
          <LayoutActions>
            <Link
              href="/admin/courses/new"
              className={buttonVariants({
                variant: "secondary",
              })}
            >
              Create new course
            </Link>
          </LayoutActions>
        </div>
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
                            <AvatarImage
                              src={course.image}
                              alt={course.name}
                              className="size-12"
                            />
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
