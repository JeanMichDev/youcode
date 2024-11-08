import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function CourseDialogLoading() {
  return (
    <Dialog open={true}>
      <DialogContent className="max-h-screen max-w-3xl overflow-auto">
        <DialogHeader>
          <DialogTitle>Loading...</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
