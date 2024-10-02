"use client";
import { useLoginDialogStore } from "@/store/login-store";
import LoginForm from "@/components/ui/authentication-03";
import { Alert } from "@/components/ui/alert";

export const LoginFormDialog = ({ ...props }) => {
  const isDialogOpen = useLoginDialogStore((state) => state.isDialogOpen);
  const handleGithub = useLoginDialogStore((state) => state.handleGithub);

  return (
    <Alert className="item-center justify-center">
      {isDialogOpen ? <LoginForm handleGithub={() => handleGithub()} /> : null}
    </Alert>
  );
};
