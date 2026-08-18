"use client";
import { create } from "zustand";
import { ProductType } from "@/types";

interface FavoritesStore {
  ids: number[];
  toggle: (product: ProductType) => void;
  isFavorite: (productId: number) => boolean;
  load: () => void;
}

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  ids: [],
  toggle: (product) => {
    const ids = get().ids.includes(product.id)
      ? get().ids.filter((id) => id !== product.id)
      : [...get().ids, product.id];
    set({ ids });
    if (typeof window !== "undefined") {
      localStorage.setItem("myd_favorites", JSON.stringify(ids));
    }
  },
  isFavorite: (productId) => get().ids.includes(productId),
  load: () => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("myd_favorites");
      if (saved) set({ ids: JSON.parse(saved) });
    }
  },
}));
