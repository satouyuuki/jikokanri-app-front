import { MonthType } from "types/index";

export interface TargetCreateAPI {
  total_time: number;
  achieved_text: string;
  // created_at: Date;
  // updated_at: Date;
}
export interface TargetUpdateAPI {
  id: number;
  total_time: number;
  achieved_text: string;
  created_at: Date;
  updated_at: Date;
}

export interface MonthAPI {
  month: number | null;
  year: number | null;
}
