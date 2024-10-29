"use client";
import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { AdminLessonItemSortable, LessonItem } from "./AdminLessonItem";
import { AdminLessonItemType } from "./lesson.query";
import { toast } from "sonner";
import { saveLessonMove } from "./[lessonId]/lesson.action";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
type AdminLessonSortableProps = {
  items: AdminLessonItemType[];
};

export const AdminLessonSortable = ({
  items: defaultItems,
}: AdminLessonSortableProps) => {
  const [items, setItems] = useState(defaultItems);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async ({
      activeId,
      newUpItemRank,
      newDownItemRank,
    }: {
      activeId: string;
      newUpItemRank: string | undefined;
      newDownItemRank: string | undefined;
    }) => {
      const result = await saveLessonMove({
        lessonId: activeId,
        upItemRank: newUpItemRank,
        downItemRank: newDownItemRank,
      });

      if (result?.serverError) {
        toast.error(result.serverError);
        return;
      }
      if (!result) return;
      router.refresh();

      setItems((prevItems) => {
        const activeItem = prevItems.find((item) => item.id === activeId);
        if (!activeItem) return prevItems;
        activeItem.rank = result.data as string;
        console.log("activeItem.rank", result.data);
        return [...prevItems];
      });
    },
  });

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) {
      toast.error("Error on handleDragEnd function");
      return;
    }

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        const newItems = arrayMove(items, oldIndex, newIndex);
        const newUpItemRank = newItems[newIndex - 1]?.rank;
        const newDownItemRank = newItems[newIndex + 1]?.rank;

        mutation.mutate({
          activeId: String(active.id),
          newUpItemRank,
          newDownItemRank,
        });
        return newItems;
      });
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items}
        strategy={verticalListSortingStrategy}
        disabled={mutation.isPending}
      >
        <div
          className={cn("flex flex-col gap-2", {
            "opacity-50": mutation.isPending,
          })}
        >
          {items.map((lesson, index) => (
            <AdminLessonItemSortable
              key={lesson.id}
              lesson={lesson}
              index={index}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};
