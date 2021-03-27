import Modal from 'Components/Modal';
import MonthTargetForm from 'Components/Form/monthTarget';
import { useState, useEffect } from 'react';
import { api } from 'service/apiService';
import { TargetListAPI, TargetMonthAPI } from 'model/requestModel';
import { TargetList } from 'model/resModel'
import { RouteComponentProps, useParams } from 'react-router-dom';

interface Props extends RouteComponentProps { };

const Testpage2 = ({ history, location, match }: Props) => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<TargetList[]>([]);
  const [show, setShow] = useState(false);
  const [form, setForm] = useState<TargetListAPI[]>([{
    target_text: '',
    target_num: 0,
  }]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get<TargetList[]>(`target_lists/${id}`);
      if (res.data.length === 0) return;
      setData(res.data);
      setForm(res.data);
    }
    fetchData();
  }, []);

  const openModal = (e: any) => {
    e.stopPropagation();
    setShow(prevshow => !prevshow);
  }
  const createMonth = async () => {
    const copyForm = form.slice();
    const formData: TargetMonthAPI = {
      target_data: {
        target_lists: copyForm
      }
    }
    const res = await api.post<TargetList[]>(`target_lists/${id}`, formData);
    setData(res.data);
  }
  const inputMonths = (e: any, index: number) => {
    e.stopPropagation();
    const copyForm = form.slice();
    const data = e.target as HTMLInputElement;
    if (data.id === 'targetText') {
      copyForm[index].target_text = data.value;
    }
    if (data.id === 'targetNum') {
      copyForm[index].target_num = parseInt(data.value, 10);
    }
    setForm(copyForm);
  }
  return (
    <div>
      <h1>月の目標リスト {id}</h1>
      <button onClick={openModal}>登録/更新</button>
      <ul>
        {data.map(item => (
          <li key={item.id}>
            <p>
              1ヶ月の目標: {item.target_text}
            </p>
            <p>
              数値目標: {item.target_num}
            </p>
            <button>削除</button>
          </li>
        ))}
      </ul>
      <Modal
        show={show}
        onClick={openModal}
        title="月の目標値を登録"
      >
        <MonthTargetForm
          form={form}
          inputMonths={inputMonths}
          createMonth={createMonth}
        />
      </Modal>

    </div>
  )
}
export default Testpage2;