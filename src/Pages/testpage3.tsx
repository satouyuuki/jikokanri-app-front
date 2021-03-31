import { useState, useEffect } from 'react';
import { api } from 'service/apiService';
import { DoneListAPI, WeekDoneListAPI } from 'model/requestModel';
import { WeekDoneList } from 'model/resModel'
import { RouteComponentProps, useParams } from 'react-router-dom';

interface Props extends RouteComponentProps { };

const Testpage3 = ({ history, location, match }: Props) => {
  const { week_id } = useParams<{ week_id: string }>();
  const [data, setData] = useState<WeekDoneList>({
    week: 0,
    month: 0,
    year: 0,
    done_lists: []
  });
  const [form, setForm] = useState<DoneListAPI[]>([])
  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get<WeekDoneList>(`done_lists/${week_id}`);
      if (Object.keys(res.data).length === 0) return;
      setData(res.data);
    }
    fetchData();
  }, []);

  const createMonth = async () => {
    const copyForm = form.slice();
    const formData: WeekDoneListAPI = {
      done_data: {
        week_id: parseInt(week_id, 10),
        done_lists: copyForm
      }
    }
    const res = await api.post<WeekDoneList>("done_lists", formData);
    // setData(res.data);
  }
  const inputMonths = (e: any, targetListId: number) => {
    e.stopPropagation();
    const copyForm = form.slice();
    const hoge = {} as DoneListAPI;
    const inputElm = e.target as HTMLInputElement;
    if (inputElm.id === 'done_num') {
      hoge.target_list_id = targetListId;
      hoge.done_num = parseInt(inputElm.value, 10);
    }
    if (copyForm.length === 0) {
      copyForm.push(hoge);
    } else {
      copyForm.map(form => {
        if (form.target_list_id === targetListId) {
          form.done_num = hoge.done_num;
        } else {
          copyForm.push(hoge);
        }
      })
    }
    setForm(copyForm);
  }
  return (
    <div>
      <h1>{data.year}年{data.month}月の第{ data.week}週目の達成値リスト</h1>
      <ul>
        {data.done_lists.map((item, index) => (
          <li key={index}>
            <p>
              1ヶ月の目標: {item.target_text}
            </p>
            <p> 
              数値目標: {item.target_num}
            </p>
            <p>
              <label htmlFor="done_num">達成値: </label>
              <input
                type="number"
                id="done_num"
                defaultValue={item.done_num}
                onChange={(e) => inputMonths(e, item.target_list_id)}
              />
            </p>
          </li>
        ))}
      </ul>
      <button onClick={createMonth}>入力</button>
    </div>
  )
}
export default Testpage3;