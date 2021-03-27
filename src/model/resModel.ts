export interface Target {
  id: number;
  total_time: number;
  achieved_text: string;
  created_at: string;
  updated_at: string;
}
export interface Week {
  id: number;
  week: number;
  month_id: number;
  created_at: string;
  updated_at: string;
}

export interface Month {
  id: number;
  year: number;
  month: number;
  created_at: string;
  updated_at: string;
  weeks: Week[];
}

export interface TargetList {
  id: number;
  target_text: string;
  target_num: number;
}
