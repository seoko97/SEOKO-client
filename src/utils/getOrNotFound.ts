import { notFound } from "next/navigation";

import { ApiError } from "@/apis";

const getOrNotFound = async <T>(get: () => Promise<T>) => {
  let data: T;

  try {
    data = await get();
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }

    throw error;
  }

  return data ?? notFound();
};

export default getOrNotFound;
