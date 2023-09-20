import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ICreateExperience, IExperience, IUpdateExperience } from "@/types/experience";
import {
  createExperience,
  deleteExperience,
  getExperiences,
  updateExperience,
} from "@/apis/experience";

const useGetExperiencesQuery = () => {
  return useQuery({
    queryKey: ["experiences"],
    queryFn: getExperiences,
  });
};

const useCreateExperienceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ICreateExperience) => createExperience(data),
    onSettled: () => {
      queryClient.invalidateQueries(["experiences"]);
    },
  });
};

const useUpdateExperienceMutation = (_id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IUpdateExperience) => updateExperience(_id, data),
    onMutate: (data: IUpdateExperience) => {
      queryClient.cancelQueries(["experiences"]);

      const previousSkills = queryClient.getQueryData<IExperience[]>(["experiences"]);

      if (!previousSkills) return;

      queryClient.setQueryData<IExperience[]>(["experiences"], (prev) => {
        if (!prev) return prev;

        const newSkills = prev.map((skill) => {
          if (skill._id !== _id) return skill;

          return { ...skill, ...data };
        });

        return newSkills;
      });

      return previousSkills;
    },
    onError: (_, __, context) => {
      if (!context) return;

      const previousSkills = context;

      queryClient.setQueryData<IExperience[]>(["experiences"], previousSkills);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["experiences"]);
    },
  });
};

const useDeleteExperienceMutation = (_id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteExperience(_id),
    onMutate: () => {
      queryClient.cancelQueries(["experiences"]);

      const previousSkills = queryClient.getQueryData<IExperience[]>(["experiences"]);

      if (!previousSkills) return;

      queryClient.setQueryData<IExperience[]>(["experiences"], (prev) => {
        if (!prev) return prev;

        const newSkills = prev.filter((skill) => skill._id !== _id);

        return newSkills;
      });

      return previousSkills;
    },
    onError: (_, __, context) => {
      if (!context) return;

      const previousSkills = context;

      queryClient.setQueryData<IExperience[]>(["experiences"], previousSkills);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["experiences"]);
    },
  });
};

const useExperienceMutation = (_id?: string) => {
  const { mutate: createExperience } = useCreateExperienceMutation();
  const { mutate: updateExperience } = useUpdateExperienceMutation(_id as string);
  const { mutate: deleteExperience } = useDeleteExperienceMutation(_id as string);

  const createOrUpdateExperience = (data: ICreateExperience | IUpdateExperience) => {
    if (_id) updateExperience(data as IUpdateExperience);
    else createExperience(data as ICreateExperience);
  };

  return { createOrUpdateExperience, deleteExperience };
};

export {
  useGetExperiencesQuery,
  useCreateExperienceMutation,
  useUpdateExperienceMutation,
  useDeleteExperienceMutation,
  useExperienceMutation,
};
