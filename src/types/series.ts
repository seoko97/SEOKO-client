import { IBaseResponse } from "@/types/base";

interface ISeries extends IBaseResponse {
  name: string;
  thumbnail?: string;
  postCount: number;
}

export type { ISeries };
