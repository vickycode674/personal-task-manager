import { create } from "zustand";

interface Project {
  id: number;
  name: string;
}

interface ProjectState {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  projects: [],
  setProjects: (projects) => set({ projects }),
}));
