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
    month_id: number;
    target_lists: TargetListAPI[]
  }
}

export interface DoneListAPI {
  target_list_id: number;
  done_num: number;
}

export interface WeekDoneListAPI {
  done_data: {
    week_id: number;
    done_lists: DoneListAPI[];
  }
}

export interface UserAPI {
  username: string;
  password: string;
}