"use client";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation } from "@tanstack/react-query";
import { LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLoginDialogStore } from "@/store/login-store";
import { User } from "lucide-react";
import Link from "next/link";
import { LogInButton } from "@/features/auth/LogInButton";

export const AuthButton = () => {
  const { data: session } = useSession();

  const toggleLoginForm = useLoginDialogStore((state) => state.toggleDialog);

  const mutationLogOut = useMutation({
    mutationFn: async () => {
      signOut({ callbackUrl: "http://localhost:3000" });
    },
  });

  return (
    <div>
      <nav>
        {session ? (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default" size="sm">
                  <Avatar className="mr-2 size-6">
                    <AvatarFallback>{session.user?.name?.[0]}</AvatarFallback>
                    {session.user?.image && (
                      <AvatarImage
                        src={session.user.image}
                        alt={session.user.name ?? "user Picture"}
                      />
                    )}
                  </Avatar>
                  {session.user?.name}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="bottom">
                <DropdownMenuItem asChild>
                  <Link href="/account">
                    <User className="mr-2" size={12} />
                    Mon compte
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    mutationLogOut.mutate();
                  }}
                  disabled={mutationLogOut.isPending}
                >
                  <LogOut size={12} className="mr-2" /> Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <LogInButton toggleLoginForm={toggleLoginForm} />
        )}
      </nav>
    </div>
  );
};
