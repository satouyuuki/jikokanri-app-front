import Modal from 'Components/Modal';
import Form from 'Components/Form';
import Table from 'Components/Table';
import { useState, useEffect } from 'react';
import { api } from 'service/apiService';
import { MonthAPI } from 'model/requestModel';
import { Month } from 'model/resModel'
import { RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps { };

const Testpage = ({ history, location, match }: Props) => {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState<MonthAPI>({ year: null, month: null });
  const [data, setData] = useState<Month[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get<Month[]>('months');
      if (res.data.length === 0) return;
      setData(res.data);
    }
    fetchData();
  }, []);

  const openModal = (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e?.stopPropagation();
    setShow(true);
  }
  const closeModal = (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e?.stopPropagation();
    setShow(false);
  }
  const createMonth = async () => {
    const copyForm = Object.assign({}, form);
    const res = await api.post<Month[]>('months', copyForm);
    if (res) {
      setData(res.data);      
      closeModal();
    }
  }
  const deleteMonth = async (monthId: number) => {
    const res = await api.delete<Month[]>(`months/${monthId}`);
    if (res) {
      setData(res.data);
      closeModal();
    }
  }
  const inputMonths = (e: React.ChangeEvent<HTMLInputElement>) => {
    const copyForm = Object.assign({}, form);
    const data = e.target;
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
      <h1>年月一覧</h1>
      <button onClick={openModal}>目標設定の年月を作成</button>
      <Table
        data={data}
        onClick={deleteMonth}
        history={history}
        match={match}
        location={location}
      />
      <Modal
        show={show}
        onClick={closeModal}
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