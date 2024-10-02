"use client";

import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "@/components/ui/loader";
import { LogIn } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLoginDialogStore } from "@/store/login-store";

export const LoggedInButton = () => {
  const { data: session } = useSession();

  const toggleLoginForm = useLoginDialogStore((state) => state.toggleDialog);

  const mutationLogIn = useMutation({
    mutationFn: async () => {
      signIn("github");
    },
  });

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
              <AlertDialog>
                <DropdownMenuTrigger>
                  <Button variant="default" size="sm">
                    <Avatar className={"mr-2 size-6"}>
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
                  <DropdownMenuItem>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline">
                        <LogIn size={12} /> Log Out
                      </Button>
                    </AlertDialogTrigger>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                </DropdownMenuContent>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to log out?
                    </AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        mutationLogOut.mutate();
                      }}
                      disabled={mutationLogOut.isPending}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenu>
          </>
        ) : (
          <Button
            variant="default"
            size="sm"
            onClick={() => toggleLoginForm()}
            disabled={mutationLogIn.isPending}
          >
            {mutationLogIn.isPending ? <Loader /> : <LogIn />}
            Log in
          </Button>
        )}
      </nav>
    </div>
  );
};
