import { create } from "zustand";

type loginStore = {
  loginMode: string;
  toggleLoginMode: (type: string) => void;
};

const useLoginStore = create<loginStore>((set) => ({
  loginMode: "signin",
  toggleLoginMode: (type: string) => set((state) => ({ loginMode: type })),
}));

export default useLoginStore;
