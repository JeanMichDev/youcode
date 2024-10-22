import { Breadcrump } from "@/components/ui/Breadcrump";
import { PropsWithChildren } from "react";

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="w-full border-b border-border/20">
        {/* Ajout de flex */}
        <div className="m-auto flex max-w-3xl items-center gap-2 px-4 py-1">
          <Breadcrump />
        </div>
      </div>
      {children}
    </>
  );
}
