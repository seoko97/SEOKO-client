import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ESkillType, ICreateSkill, TSkills, TUpdateSkill } from "@/types/skill";
import { createSkill, deleteSkill, getSkills, updateSkill } from "@/apis/skill";

const useGetSkillsQuery = () => {
  return useQuery({
    queryKey: ["skills"],
    queryFn: getSkills,
  });
};

const useCreateSkillMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ICreateSkill) => createSkill(data),
    onSettled: () => {
      queryClient.invalidateQueries(["skills"]);
    },
  });
};

const useUpdateSkillMutation = (_id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TUpdateSkill) => updateSkill(_id, data),
    onMutate: (data: TUpdateSkill) => {
      queryClient.cancelQueries(["skills"]);

      const previousSkills = queryClient.getQueryData<TSkills>(["skills"]);

      if (!previousSkills) return;

      queryClient.setQueryData<TSkills>(["skills"], (prev) => {
        if (!prev) return prev;

        const newSkills = Object.keys(prev).reduce((acc, key) => {
          const skillCategory = prev[key as ESkillType];

          const newSkillCategory = skillCategory.map((skill) => {
            if (skill._id !== _id) return skill;

            return { ...skill, ...data };
          });

          return { ...acc, [key]: newSkillCategory };
        }, {} as TSkills);

        return newSkills;
      });

      return previousSkills;
    },
    onError: (_, __, context) => {
      if (!context) return;

      const previousSkills = context;

      queryClient.setQueryData<TSkills>(["skills"], previousSkills);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["skills"]);
    },
  });
};

const useDeleteSkillMutation = (_id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteSkill(_id),
    onMutate: () => {
      queryClient.invalidateQueries(["skills"]);

      const previousSkills = queryClient.getQueryData<TSkills>(["skills"]);

      if (!previousSkills) return;

      queryClient.setQueryData<TSkills>(["skills"], (prev) => {
        if (!prev) return prev;

        const newSkills = Object.keys(prev).reduce((acc, key) => {
          const skillCategory = prev[key as ESkillType];

          const newSkillCategory = skillCategory.filter((skill) => skill._id !== _id);

          return { ...acc, [key]: newSkillCategory };
        }, {} as TSkills);

        return newSkills;
      });

      return previousSkills;
    },
    onError: (_, __, context) => {
      if (!context) return;

      const previousSkills = context;

      queryClient.setQueryData<TSkills>(["skills"], previousSkills);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["skills"]);
    },
  });
};

const useSkillMutation = (_id?: string) => {
  const { mutate: create } = useCreateSkillMutation();
  const { mutate: update } = useUpdateSkillMutation(_id as string);
  const { mutate: remove } = useDeleteSkillMutation(_id as string);

  const createOrUpdate = (data: ICreateSkill | TUpdateSkill) => {
    if (_id) update(data as TUpdateSkill);
    else create(data as ICreateSkill);
  };

  return { createOrUpdate, remove };
};

export {
  useGetSkillsQuery,
  useCreateSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation,
  useSkillMutation,
};
