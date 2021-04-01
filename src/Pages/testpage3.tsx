import { useState, useEffect } from 'react';
import { api } from 'service/apiService';
import { DoneListAPI, WeekDoneListAPI } from 'model/requestModel';
import { WeekDoneList } from 'model/resModel'
import { RouteComponentProps, useParams } from 'react-router-dom';

interface Props extends RouteComponentProps { };

const Testpage3 = ({ history, location, match }: Props) => {
  const { week_id } = useParams<{ week_id: string }>();
  const [writeMode, setWriteMode] = useState<boolean>(false);
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
  /** 入力モードを切り替える */
  const startWriteMode = () => {
    setWriteMode(true);
  }
  const endWriteMode = () => {
    setWriteMode(false);
  }

  /** 選択した達成リストを削除する */
  const onDeleteDone = async (id?: number) => {
    const res = await api.delete<WeekDoneList>(`done_lists/${id}`);
    setData(res.data);
  }
  const createMonth = async () => {
    const copyForm = form.slice();
    const formData: WeekDoneListAPI = {
      done_data: {
        week_id: parseInt(week_id, 10),
        done_lists: copyForm
      }
    }
    const res = await api.post<WeekDoneList>("done_lists", formData);
    if (Object.keys(res.data).length > 0) {
      setData(res.data);
      endWriteMode();
    }
  }
  const inputMonths = (e: React.ChangeEvent<HTMLInputElement>, targetListId: number) => {
    e.stopPropagation();
    const copyForm = form.slice();
    const doneListData = {} as DoneListAPI;
    const inputElm = e.target;
    if (inputElm.name === 'done_num') {
      doneListData.target_list_id = targetListId;
      doneListData.done_num = parseInt(inputElm.value, 10);
    }
    if (copyForm.length === 0) {
      copyForm.push(doneListData);
    } else {
      copyForm.map(form => {
        if (form.target_list_id === targetListId) {
          form.done_num = doneListData.done_num;
        } else {
          copyForm.push(doneListData);
        }
      })
    }
    setForm(copyForm);
  }
  return (
    <div>
      <h1>{data.year}年{data.month}月の第{data.week}週目の達成値リスト</h1>
      {!writeMode && <button onClick={startWriteMode}>入力モード</button>}
      {writeMode && <button onClick={endWriteMode}>入力モード終了</button>}
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
              達成値:
              {!writeMode &&
                  item.done_list_id
                    ? <div>
                        {item.done_num}
                        <button onClick={() => onDeleteDone(item.done_list_id)}>削除</button>
                      </div>
                    : '入力されてません'
              }
              {writeMode &&
                <input
                  type="number"
                  name="done_num"
                  defaultValue={item.done_num}
                  onChange={(e) => inputMonths(e, item.target_list_id)}
                />
              }
            </p>
          </li>
        ))}
      </ul>
      {writeMode && <button onClick={createMonth}>入力</button>}
    </div>
  )
}
export default Testpage3;