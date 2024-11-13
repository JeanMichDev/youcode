"use client";
import React from "react";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
} from "@/components/layout/layout";
import { Typography } from "@/components/ui/Typography";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { useParams } from "next/navigation";

export default function LessonError() {
  const params = useParams();

  return (
    <Layout>
      <LayoutHeader>
        <Typography variant="h2">
          You are not authorized to view this lesson
        </Typography>
      </LayoutHeader>
      <LayoutContent>
        <Link
          href={`/mycourses/${params?.myCourseId}`}
          className={buttonVariants()}
        >
          Join now
        </Link>
      </LayoutContent>
    </Layout>
  );
}
