"use client";
import { useDebounce } from "@/hooks/useDebounce";
import { lessonActionEditContent } from "../lesson.action";
import InitializedMDXEditor from "./InitializedMDXEditor";
import { useEffect, useState } from "react";
import { ServerError } from "@/lib/safe-action";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { set } from "zod";
import { Badge, BadgeProps } from "@/components/ui/badge";

type AdminLessonMarkdownProps = {
  markdown: string;
  lessonId: string;
};

type SyncState = "sync" | "not-sync" | "syncing";

const getBadgeVariant = (syncState: SyncState): BadgeProps["variant"] => {
  switch (syncState) {
    case "sync":
      return "secondary";
    case "syncing":
      return "default";
    case "not-sync":
      return "destructive";
  }
};

export const AdminLessonMarkdown = ({
  markdown,
  lessonId,
}: AdminLessonMarkdownProps) => {
  const [syncState, setSyncState] = useState<SyncState>("sync");
  const { executeAsync } = useAction(lessonActionEditContent);

  useEffect(() => {
    const handleBeforeUnload = (e: Event) => {
      e.preventDefault();
      alert("are you sure you want to leave?");
    };

    if (syncState === "not-sync" || syncState === "sync") {
      window.addEventListener("beforeunload", handleBeforeUnload);
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [syncState]);

  const onChange = useDebounce(async (value: string) => {
    setSyncState("syncing");
    try {
      const data = await executeAsync({
        lessonId: lessonId,
        markdown: value,
      });
      if (data?.serverError) {
        toast.error(data.serverError.serverError);
        setSyncState("not-sync");
        return;
      }
      toast.success(data?.data?.message);
      setSyncState("sync");
    } catch (e) {
      toast.error("An  BIZARE error occurred");
    }
  }, 1000);

  return (
    <div className="relative">
      <div className="absolute bottom-2 right-2">
        <Badge variant={getBadgeVariant(syncState)}>{syncState}</Badge>
      </div>
      <InitializedMDXEditor
        onChange={(v) => {
          setSyncState("not-sync");
          onChange(v);
        }}
        markdown={markdown}
      />
    </div>
  );
};
