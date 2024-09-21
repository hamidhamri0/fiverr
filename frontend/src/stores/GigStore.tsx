// src/stores/counter-store.ts
"use client";
import { ReactNode, createContext, useContext, useRef } from "react";
import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";
import {
  Categories,
  Services,
  Subcategories,
  Metadata,
  Feature,
  GigData,
} from "../types/gig.interface";

export type State = {
  categories: Categories;
  subcategories: Subcategories;
  services: Services;
  metadata: Metadata[];
  features: Feature[];
  gig: GigData;
};

export type StateActions = {
  setCategories: (categories: Categories) => void;
  setSubcategories: (subcategories: Subcategories) => void;
  setServices: (services: Services) => void;
  setMetadata: (metadata: Metadata[]) => void;
  setFeatures: (features: Feature[]) => void;
};

export type StateStore = State & StateActions;

export const defaultInitState: State = {
  categories: [],
  subcategories: [],
  services: [],
  metadata: [],
  features: [],
  gig: {} as GigData,
};

export const createStateStore = (initState: State = defaultInitState) => {
  return createStore<StateStore>()((set) => ({
    ...initState,
    setCategories: (categories) => set({ categories }),
    setSubcategories: (subcategories) => set({ subcategories }),
    setServices: (services) => set({ services }),
    setMetadata: (metadata) => set({ metadata }),
    setFeatures: (features) => set({ features }),
  }));
};

type StoreApi = ReturnType<typeof createStateStore>;

const Context = createContext<StoreApi | undefined>(undefined);

interface GigStoreProviderProps {
  children: ReactNode;
  initialState?: State;
}

export default function GigStoreProvider({
  children,
  initialState,
}: GigStoreProviderProps) {
  const storeRef = useRef<StoreApi>();
  if (!storeRef.current) {
    storeRef.current = createStateStore(initialState);
  }
  return (
    <Context.Provider value={storeRef.current}>{children}</Context.Provider>
  );
}

export const useGigStore = <T,>(selector: (store: StateStore) => T): T => {
  const counterStoreContext = useContext(Context);

  if (!counterStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`);
  }

  return useStore(counterStoreContext, selector);
};
