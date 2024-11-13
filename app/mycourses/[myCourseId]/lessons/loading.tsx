import { LessonItemPlaceholder } from "./LessonItemPlaceholder";
import { LessonNavigationSkeleton } from "./LessonNavigationSkeleton";

export default function LessonLoading() {
  return (
    <div className="flex items-start gap-4 p-4">
      <LessonNavigationSkeleton />
      <LessonItemPlaceholder />
    </div>
  );
}
