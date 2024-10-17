// src/stores/counter-store.ts
"use client";
import { ReactNode, createContext, useContext, useEffect, useRef } from "react";
import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";
import { User } from "@fiverr/shared";

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
    country: "",
    phoneNumber: undefined,
    googleId: undefined,
    appleId: undefined,
    facebookId: undefined,
    isNew: false,
    isVerifiedPhoneNumber: false,
    isVerifiedEmail: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    description: "",
    picture: "",
    languages: [],
    timezone: "",
    preferredStartDay: 0,
    preferredEndDay: 0,
    preferredStartTime: "",
    preferredEndTime: "",
    phoneVerifications: [],
    gigs: [],
    gigRatings: [],
    userRating: 0,
    bio: "",
    skills: [],
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
    throw new Error(`useUserInfoStore must be used within useUserInfoProvider`);
  }

  return useStore(counterStoreContext, selector);
};
