"use client";
import { ReactNode, createContext, useContext, useRef } from "react";
import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";
import {
  Category,
  Feature,
  Gig,
  Metadata,
  Subcategory,
  Service,
} from "@fiverr/shared";

export type State = {
  categories: Category[];
  subcategories: Subcategory[];
  services: Service[];
  metadata: Metadata[];
  features: Feature[];
  gig: Gig;
};

export type StateActions = {
  setCategories: (categories: Category[]) => void;
  setSubcategories: (subcategories: Subcategory[]) => void;
  setServices: (services: Service[]) => void;
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
  gig: {} as Gig,
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
