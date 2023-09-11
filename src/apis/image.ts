import { TImageType } from "@/types/base";
import api from "@/apis";

const uploadImage = async (type: TImageType, formData: FormData) => {
  const res = await api.post<string>(`/images/${type}`, formData);

  return res.data;
};

export { uploadImage };
