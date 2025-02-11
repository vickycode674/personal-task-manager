import { create } from "zustand";

interface Category {
  id: number;
  name: string;
}

interface CategoryState {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],
  setCategories: (categories) => set({ categories }),
}));
