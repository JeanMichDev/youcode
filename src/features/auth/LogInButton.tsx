"use client";
import { LogIn, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";

type LogInButtonProps = {
  toggleLoginForm: () => void;
};

export const LogInButton = ({
  toggleLoginForm,
  ...props
}: LogInButtonProps) => {
  const mutationLogIn = useMutation({
    mutationFn: async () => {
      signIn("github", { callback: "http://localhost:3000" });
    },
  });

  return (
    <Button
      variant="default"
      size="sm"
      onClick={() => toggleLoginForm()}
      disabled={mutationLogIn.isPending}
    >
      {mutationLogIn.isPending ? <Loader /> : <LogIn className="mr-2" />}
      Log in
    </Button>
  );
};
