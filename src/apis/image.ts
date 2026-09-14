import { EImageType } from "@/types/base";
import { authRequest } from "@/apis";

const uploadImage = async (type: EImageType, formData: FormData) => {
  return authRequest<string>(`/images/${type}`, {
    method: "POST",
    body: formData,
    responseType: "text",
  });
};

export { uploadImage };
