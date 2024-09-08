// src/stores/counter-store.ts
"use client";
import { ReactNode, createContext, useContext, useRef } from "react";
import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";

export type User = {
  name: string;
  email: string;
  username: string;
  country?: string;
  googleId?: string;
  appleId?: string;
  facebookId?: string;
  isNew: boolean;
  isVerified: boolean;
  picture?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type State = {
  user: User;
};

export type StateActions = {
  setUser: (user: User) => void;
};

export type StateStore = State & StateActions;

export const defaultInitState: State = {
  user: {
    name: "",
    email: "",
    username: "",
    isNew: false,
    isVerified: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};

export const createStateStore = (initState: State = defaultInitState) => {
  return createStore<StateStore>()((set) => ({
    ...initState,
    setUser: (user) => set({ user }),
  }));
};

type StoreApi = ReturnType<typeof createStateStore>;

const Context = createContext<StoreApi | undefined>(undefined);

interface UserInfoStoreProviderProps {
  children: ReactNode;
  initialState?: State;
}

export default function UserInfoStoreProvider({
  children,
  initialState,
}: UserInfoStoreProviderProps) {
  const storeRef = useRef<StoreApi>();
  if (!storeRef.current) {
    storeRef.current = createStateStore(initialState);
  }
  return (
    <Context.Provider value={storeRef.current}>{children}</Context.Provider>
  );
}

export const useUserInfoStore = <T,>(selector: (store: StateStore) => T): T => {
  const counterStoreContext = useContext(Context);

  if (!counterStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`);
  }

  return useStore(counterStoreContext, selector);
};
