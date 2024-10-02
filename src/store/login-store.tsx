import { create } from "zustand";
import { signIn } from "next-auth/react";

type LoginDialogState = {
  isDialogOpen: boolean;
  toggleDialog: () => void;
  handleGithub: () => void;
};

export const useLoginDialogStore = create<LoginDialogState>((set) => ({
  isDialogOpen: false,
  toggleDialog: () => set((state) => ({ isDialogOpen: !state.isDialogOpen })),
  handleGithub: () => {
    signIn("github");
  },
}));
