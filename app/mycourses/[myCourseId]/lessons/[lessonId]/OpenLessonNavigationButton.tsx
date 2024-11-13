"use client";
import React from "react";
import {
  useLessonNavigationState,
  useLessonNavigationStore,
} from "../lesson-navigation.store";
import { Button } from "@/components/ui/button";
import { PanelRightOpen } from "lucide-react";

export const OpenLessonNavigationButton = ({
  className,
}: {
  className: string;
}) => {
  const setState = useLessonNavigationStore((s) => s.setState); // syntaxe pour récupérer que la méthode setState du store
  const state = useLessonNavigationState();

  if (state === "sticky") return;
  return (
    <Button
      onClick={() => setState("open")}
      size="sm"
      variant="ghost"
      className={className}
    >
      <PanelRightOpen />
    </Button>
  );
};
