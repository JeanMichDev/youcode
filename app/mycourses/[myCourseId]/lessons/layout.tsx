import { PropsWithChildren, Suspense } from "react";
import { LessonNavigation } from "./LessonNavigation";
import { LessonNavigationSkeleton } from "./LessonNavigationSkeleton";
export default function layout({
  children,
  params,
}: PropsWithChildren<{
  params: {
    myCourseId: string;
  };
}>) {
  return (
    <div className="relative flex w-screen items-start gap-4 p-4">
      {children}
      <Suspense fallback={<LessonNavigationSkeleton />}>
        <LessonNavigation courseId={params.myCourseId} />
      </Suspense>
    </div>
  );
}
