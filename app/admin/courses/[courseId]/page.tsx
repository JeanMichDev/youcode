import { getRequiredAuthSession } from "@/lib/auth";
import { getAdminCourse } from "./admin-course.query";
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
import { Typography } from "@/components/ui/Typography";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { PaginationButton } from "@/features/pagination/paginationButton";
import { buttonVariants } from "@/components/ui/button";
import { GoBackItem } from "@/features/pagination/GoBackItem";
import { Breadcrump } from "@/components/ui/Breadcrump";

type CoursePageProps = {
  params: {
    courseId: string;
  };
  searchParams: { [key: string]: string | string | undefined };
};

export default async function CourseId({
  params,
  searchParams,
}: CoursePageProps) {
  const page = Number(searchParams.page ?? 0);

  const session = await getRequiredAuthSession();
  const course = await getAdminCourse({
    courseId: params.courseId,
    userId: session.user.id,
    userPage: page,
  });

  return (
    <Layout>
      <LayoutHeader>
        <GoBackItem url="/admin/courses" />
        <LayoutTitle>{course.name}</LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="flex flex-col gap-4 lg:flex-row">
        <Card className="flex-[2]">
          <CardHeader>
            <Typography variant="large">Users</Typography>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {course.users?.map((user) => {
                  return (
                    <TableRow>
                      <TableCell>
                        <Avatar className="rounded">
                          <AvatarFallback>{user.email}</AvatarFallback>
                          {user.image && (
                            <AvatarImage
                              src={user.image}
                              alt={user.id}
                              className="size-10"
                            />
                          )}
                        </Avatar>
                      </TableCell>
                      <TableCell>
                        <Typography
                          as={Link}
                          variant="large"
                          href={`/admin/users/${user.id}`}
                        >
                          {user.email}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {user.canceled ? "Cancel" : "Active"}
                      </TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <PaginationButton
              page={page}
              totalPage={Math.ceil((course._count?.users ?? 0) / 5)}
              baseUrl={`/admin/courses/${params.courseId}`}
            />
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <div className="flex-row items-center gap-4 space-y-0">
              <Avatar className="rounded">
                <AvatarFallback>{course.name?.[0]}</AvatarFallback>
                {course.image && (
                  <AvatarImage src={course.image} alt={course.id} />
                )}
              </Avatar>
              <CardTitle>{course.name}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-1">
            <Typography>{course._count?.users} users</Typography>
            <Typography>{course._count?.lessons} lessons</Typography>
            <Link
              href={`/admin/courses/${params.courseId}/edit`}
              className={buttonVariants({ variant: "outline" })}
            >
              Edit
            </Link>
            <Link
              href={`/admin/courses/${params.courseId}/lessons`}
              className={buttonVariants({ variant: "outline" })}
            >
              Lesson Edit
            </Link>
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
