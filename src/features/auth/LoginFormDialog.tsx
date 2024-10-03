"use client";
import { useLoginDialogStore } from "@/store/login-store";
import LoginForm from "@/components/ui/authentication-03";

export const LoginFormDialog = ({ ...props }) => {
  const isDialogOpen = useLoginDialogStore((state) => state.isDialogOpen);
  const handleGithub = useLoginDialogStore((state) => state.handleGithub);

  return (
    <>
    
      {isDialogOpen ? (
        <div className="fixed inset-0 flex items-center justify-center">
        <LoginForm handleGithub={() => handleGithub()} />
        </div>
        ) : null}
    
    </>
  );
};
