"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";

export const LogOutButton = () => {
  const mutationLogOut = useMutation({
    mutationFn: async () => {
      signOut({ callbackUrl: "http://localhost:3000" });
    },
  });
  return (
    <Button
      variant="destructive"
      onClick={() => {
        mutationLogOut.mutate();
      }}
      disabled={mutationLogOut.isPending}
    >
      <LogOut size={12} className="mr-2" /> Log Out
    </Button>
  );
};
