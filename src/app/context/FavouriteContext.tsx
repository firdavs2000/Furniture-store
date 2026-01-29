"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type FavoriteItem = {
  id: number;
  quantity: number;
};

type FavouriteContextType = {
  favorites: FavoriteItem[];
  addToFavorite: (id: number, quantity: number) => void;
  removeFromFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
};

const FavouriteContext = createContext<FavouriteContextType | null>(null);

export function FavouriteProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  const addToFavorite = (id: number, quantity: number) => {
    setFavorites((prev) => {
      const existing = prev.find((item) => item.id === id);

      if (existing) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity } : item
        );
      }

      return [...prev, { id, quantity }];
    });
  };

  const removeFromFavorite = (id: number) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  };

  const isFavorite = (id: number) => {
    return favorites.some((item) => item.id === id);
  };

  return (
    <FavouriteContext.Provider
      value={{ favorites, addToFavorite, removeFromFavorite, isFavorite }}
    >
      {children}
    </FavouriteContext.Provider>
  );
}

export function useFavourites() {
  const ctx = useContext(FavouriteContext);
  if (!ctx) {
    throw new Error("useFavorites must be used inside FavouriteProvider");
  }
  return ctx;
}
