// src/stores/counter-store.ts
"use client";
import { ReactNode, createContext, useContext, useEffect, useRef } from "react";
import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";

export type User = {
  id: string;
  name: string;
  email: string;
  username: string;
  country: string | null;
  googleId?: string | null;
  appleId?: string | null;
  facebookId?: string | null;
  isNew: boolean;
  isVerified: boolean;
  isVerifiedPhoneNumber: boolean;
  isVerifiedEmail: boolean;
  phoneNumber: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type State = {
  user: User | null;
};

export type StateActions = {
  setUser: (user: User) => void;
};

export type StateStore = State & StateActions;

export const defaultInitState: State = {
  user: {
    id: "",
    name: "",
    email: "",
    username: "",
    country: null,
    phoneNumber: null,
    googleId: null,
    appleId: null,
    facebookId: null,
    isNew: false,
    isVerifiedPhoneNumber: false,
    isVerifiedEmail: false,
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
  storeRef.current = createStateStore(initialState);
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
