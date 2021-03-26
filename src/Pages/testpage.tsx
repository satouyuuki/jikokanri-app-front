import Modal from 'Components/Modal';
import Form from 'Components/Form';
import { useState, useEffect } from 'react';
import { api } from 'service/apiService';
import { MonthAPI } from 'model/requestModel';
interface Months {
  id: number;
  year: number;
  month: number;
  created_at: string;
  updated_at: string;
}
const Testpage: React.FC = () => {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState<MonthAPI>({ year: null, month: null });
  const [data, setData] = useState<Months[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get<Months[]>('months');
      console.log(res.data);
      setData(res.data);
    }
    fetchData();
  }, []);

  const openModal = (e: any) => {
    e.stopPropagation();
    setShow(prevshow => !prevshow);
  }
  const createMonth = async () => {
    const copyForm = Object.assign({}, form);
    const res = await api.post<Months>('months', copyForm);
    const copyData = data.slice();
    setData([...copyData, res.data]);
    console.log(res.data);
  }
  const inputMonths = (e: any) => {
    const copyForm = Object.assign({}, form);
    const data = e.target as HTMLInputElement;
    if (data.id === 'year') {
      copyForm.year = parseInt(data.value, 10);
    }
    if (data.id === 'month') {
      copyForm.month = parseInt(data.value, 10);      
    }
    setForm(copyForm);
  }
  return (
    <div>
      <h1>テストページ</h1>
      <button onClick={openModal}>Click</button>
      <table>
        <thead>
          <tr>
            <th>タイトル</th>
            <th>削除</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.year}年{item.month}月の目標値</td>
              <td>
                <button>×</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        show={show}
        onClick={openModal}
        title="達成月を作成"
      >
        <Form
          inputMonths={inputMonths}
          onClick={createMonth}
        />
      </Modal>
    </div>
  )
}
export default Testpage;