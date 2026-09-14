import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { experienceQueryKeys } from "@utils/query/queryKeys";
import { CACHE_TAG } from "@utils/constant/cacheTag";
import { revalidateCacheTags } from "@/utils/revalidateCacheTags";
import { ICreateExperience, IExperience, IUpdateExperience } from "@/types/experience";
import {
  createExperience,
  deleteExperience,
  getExperiences,
  updateExperience,
} from "@/apis/experience";

const useGetExperiencesQuery = () => {
  return useQuery({
    queryKey: experienceQueryKeys.root,
    queryFn: getExperiences,
  });
};

const useCreateExperienceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ICreateExperience) => createExperience(data),
    onSuccess: async () => {
      await revalidateCacheTags([CACHE_TAG.experiences]);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: experienceQueryKeys.root });
    },
  });
};

const useUpdateExperienceMutation = (_id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IUpdateExperience) => updateExperience(_id, data),
    onSuccess: async () => {
      await revalidateCacheTags([CACHE_TAG.experiences]);
    },
    onMutate: async (data: IUpdateExperience) => {
      await queryClient.cancelQueries({ queryKey: experienceQueryKeys.root });

      const previousSkills = queryClient.getQueryData<IExperience[]>(experienceQueryKeys.root);

      if (!previousSkills) {
        return;
      }

      queryClient.setQueryData<IExperience[]>(experienceQueryKeys.root, (prev) => {
        if (!prev) {
          return prev;
        }

        const newSkills = prev.map((skill) => {
          if (skill._id !== _id) {
            return skill;
          }

          return { ...skill, ...data };
        });

        return newSkills;
      });

      return previousSkills;
    },
    onError: (_, __, context) => {
      if (!context) {
        return;
      }

      const previousSkills = context;

      queryClient.setQueryData<IExperience[]>(experienceQueryKeys.root, previousSkills);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: experienceQueryKeys.root });
    },
  });
};

const useDeleteExperienceMutation = (_id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteExperience(_id),
    onSuccess: async () => {
      await revalidateCacheTags([CACHE_TAG.experiences]);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: experienceQueryKeys.root });

      const previousSkills = queryClient.getQueryData<IExperience[]>(experienceQueryKeys.root);

      if (!previousSkills) {
        return;
      }

      queryClient.setQueryData<IExperience[]>(experienceQueryKeys.root, (prev) => {
        if (!prev) {
          return prev;
        }

        const newSkills = prev.filter((skill) => skill._id !== _id);

        return newSkills;
      });

      return previousSkills;
    },
    onError: (_, __, context) => {
      if (!context) {
        return;
      }

      const previousSkills = context;

      queryClient.setQueryData<IExperience[]>(experienceQueryKeys.root, previousSkills);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: experienceQueryKeys.root });
    },
  });
};

const useExperienceMutation = (_id?: string) => {
  const { mutate: createExperience } = useCreateExperienceMutation();
  const { mutate: updateExperience } = useUpdateExperienceMutation(_id as string);
  const { mutate: deleteExperience } = useDeleteExperienceMutation(_id as string);

  const createOrUpdateExperience = (data: ICreateExperience | IUpdateExperience) => {
    if (_id) {
      updateExperience(data as IUpdateExperience);
    } else {
      createExperience(data as ICreateExperience);
    }
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
