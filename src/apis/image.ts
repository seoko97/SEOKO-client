import { EImageType } from "@/types/base";
import api from "@/apis";

const uploadImage = async (type: EImageType, formData: FormData) => {
  const { data } = await api.post<string>(`/images/${type}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data;
};

export { uploadImage };
