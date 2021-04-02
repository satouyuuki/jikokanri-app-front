import Modal from 'Components/Modal';
import MonthTargetForm from 'Components/Form/monthTarget';
import TargetListTable from 'Components/Table/targetList';
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
  /** ライフサイクル: 画面描画時 */
  useEffect(() => {
    showTargetList();
  }, []);
  /** モーダル表示/非表示 */
  const toggleModal = () => {
    // e.stopPropagation();
    setShow(prevshow => !prevshow);
  }
  /** 編集モーダルに切り替える */
  const changeEditModal = async () => {
    const copyData = data.slice();
    setForm(copyData);
    toggleModal();
  }
  /** 新規作成モーダルに切り替える */
  const changeCreateModal = async () => {
    const initForm = {
      target_text: '',
      target_num: 0,
    }
    setForm([initForm]);
    toggleModal();
  }
  /** 初期値設定 */
  const showTargetList = async () => {
    const res = await api.get<TargetList[]>(`target_lists/${id}`);
    if (res.data.length === 0) return;
    setData(res.data);
  }
  /** 新規目標リスト作成 */
  const createMonth = async () => {
    const copyForm = form.slice();
    const formData: TargetMonthAPI = {
      target_data: {
        month_id: parseInt(id, 10),
        target_lists: copyForm
      }
    }
    const res = await api.post<TargetList[]>(`target_lists`, formData);
    if (res.data.length === 0) return;
    setData(res.data);
    toggleModal();
  }
  /** 選択した目標リストを削除する */
  const deleteTargetList = async (id: number) => {
    const res = await api.delete<TargetList[]>(`target_lists/${id}`);
    setData(res.data);
  }
  /** フォーム部品を追加する */
  const onAddForm = () => {
    const copyForm = form.slice();
    const addData = {
      target_text: '',
      target_num: 0,
    };
    setForm([...copyForm, addData])
  }
  /** フォーム部品を削除する */
  const onDeleteForm = (index: number) => {
    setForm(prevForm => {
      const newForm = prevForm.filter((item, i) => i !== index);
      return newForm;
    });
  }
  const inputMonths = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    e.stopPropagation();
    const copyForm = form.slice();
    const target = e.target;
    if (target.id === 'targetText') {
      copyForm[index].target_text = target.value;
    }
    if (target.id === 'targetNum') {
      copyForm[index].target_num = parseInt(target.value, 10);
    }
    setForm([...copyForm]);
  }

  return (
    <div>
      <h1>月の目標リスト {id}</h1>
      <button onClick={changeCreateModal}>新規登録</button>
      <button onClick={changeEditModal}>編集</button>
      <TargetListTable
        data={data}
        onClick={deleteTargetList}
      />
      <Modal
        show={show}
        onClick={toggleModal}
        title="月の目標値を登録"
      >
        <MonthTargetForm
          form={form}
          inputMonths={inputMonths}
          createMonth={createMonth}
          onAddForm={onAddForm}
          onDeleteForm={onDeleteForm}
        />
      </Modal>

    </div>
  )
}
export default Testpage2;