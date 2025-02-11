import { useQuery } from "@tanstack/react-query";
import { useTaskStore } from "@/app/store/useTaskStore";
import { useProjectStore } from "@/app/store/useProjectStore";
import { useCategoryStore } from "@/app/store/useCategoryStore";
import { fetchTasks } from "@/app/api/task";
import { fetchProjects } from "@/app/api/project";
import { fetchCategories } from "@/app/api/categories";

export const useFetchData = () => {
  const { setTasks } = useTaskStore();
  const { setProjects } = useProjectStore();
  const { setCategories } = useCategoryStore();

  useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
    onSuccess: setTasks,
  });

  useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    onSuccess: setProjects,
  });

  useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    onSuccess: setCategories,
  });
};
