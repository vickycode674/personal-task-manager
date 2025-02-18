import { create } from "zustand";

interface Project {
  id: number;
  name: string;
}

interface ProjectState {
  projects: Project[];
  selectedProject: number | null;
  setProjects: (projects: Project[]) => void;
  setSelectedProject: (projectId: number) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  projects: [],
  selectedProject: null,
  setProjects: (projects) => set({ projects }),
  setSelectedProject: (projectId) => set({ selectedProject: projectId }),
}));
