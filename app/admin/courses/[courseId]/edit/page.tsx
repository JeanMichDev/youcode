import { getRequiredAuthSession } from "@/lib/auth";
import {
  Layout,
  LayoutActions,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GoBackItem } from "@/features/pagination/GoBackItem";
import { prisma } from "@/lib/prisma";

import { notFound } from "next/navigation";

import { CourseForm } from "./CourseForm";

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
  const session = await getRequiredAuthSession();
  const course = await prisma.course.findUnique({
    where: {
      id: params.courseId,
      creatorId: session.user.id,
    },
    select: {
      id: true,
      image: true,
      name: true,
      presentation: true,
    },
  });

  if (!course) notFound();

  return (
    <Layout>
      <LayoutHeader>
        <GoBackItem url="/admin/courses" />
        <LayoutTitle>{course.name}</LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="flex flex-col gap-4 lg:flex-row">
        <Card>
          <CardContent className="mt-6">
            <CourseForm defaultValue={course} />
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
