import { CheckCircle, Circle, CircleDashed, Icon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export const LessonItemPlaceholder = () => {
  return (
    <div className="flex items-center justify-between gap-4 rounded-md border border-border bg-card px-4 py-2 transition-colors hover:bg-accent">
      <CircleDashed size={16} />
      <Skeleton className="h-9 w-40" />
    </div>
  );
};
