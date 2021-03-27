export interface TargetCreateAPI {
  total_time: number;
  achieved_text: string;
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
export interface TargetListAPI {
  id?: number;
  target_text: string;
  target_num: number;
}
export interface TargetMonthAPI {
  target_data: {
    target_lists: TargetListAPI[]
  }
}
