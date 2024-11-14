import {
  Layout,
  LayoutActions,
  LayoutHeader,
  LayoutTitle,
  LayoutContent,
} from "@/components/layout/layout";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { QuickStats } from "./QuickStats";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Typography } from "@/components/ui/Typography";
import { User2, BookCheck, Presentation } from "lucide-react";
import { NewUserStat } from "./NewUserStat";

export default function AdminPage() {
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Courses</LayoutTitle>
      </LayoutHeader>
      <LayoutActions>
        <Link href="/admin/courses" className={buttonVariants()}>
          Courses
        </Link>
      </LayoutActions>
      <LayoutContent className="flex flex-col gap-4">
        <Suspense
          fallback={
            <Card>
              <CardHeader>Quick Stats</CardHeader>
              <CardContent>
                <Typography>
                  <User2 className="inline" size={16} />{" "}
                  <Skeleton className="inline-flex h-5 w-10" /> Users
                </Typography>
                <Typography>
                  <BookCheck className="inline" size={16} />{" "}
                  <Skeleton className="inline-flex h-5 w-10" /> Courses
                </Typography>
                <Typography>
                  <Presentation className="inline" size={16} />{" "}
                  <Skeleton className="inline-flex h-5 w-10" /> Lessons
                </Typography>
              </CardContent>
            </Card>
          }
        >
          <QuickStats />
        </Suspense>
        <Suspense
          fallback={
            <Card>
              <CardHeader>Key Metrics</CardHeader>
              <CardContent>
                <Skeleton className="h-60 w-full" />
              </CardContent>
            </Card>
          }
        >
          <NewUserStat />
        </Suspense>
      </LayoutContent>
    </Layout>
  );
}
