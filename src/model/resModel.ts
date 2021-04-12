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
  // created_at: string;
  // updated_at: string;
}

export interface Month {
  id: number;
  year: number;
  month: number;
  // created_at: string;
  // updated_at: string;
  target_lists_flag: boolean;
  weeks: Week[];
}
export interface TargetListData {
  month: number;
  target_lists: TargetList[];
}
export interface TargetList {
  id: number;
  target_text: string;
  target_num: number;
  done_num_sum: number;
}

export interface DoneList {
  target_list_id: number;
  target_text: string;
  target_num: number;
  done_list_id?: number;
  done_num?: number;
}

export interface WeekDoneList {
  week: number;
  month: number;
  year: number;
  done_lists: DoneList[];
}
