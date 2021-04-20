import Modal from 'Components/Modal';
import MonthTargetForm from 'Components/Form/monthTarget';
import TargetListTable from 'Components/Table/targetList';
import { useState, useEffect } from 'react';
import { api } from 'service/apiService';
import { TargetListAPI, TargetMonthAPI } from 'model/requestModel';
import { TargetListData } from 'model/resModel'
import { RouteComponentProps, useParams } from 'react-router-dom';

interface Props extends RouteComponentProps { };

const Testpage2 = ({ history, location, match }: Props) => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<TargetListData>({
    month: 0,
    target_lists: []
  });
  const [show, setShow] = useState(false);
  const [form, setForm] = useState<TargetListAPI[]>([{
    target_text: '',
    target_num: 0,
  }]);
  const [editMode, setEditMode] = useState<boolean>(false);
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
  const changeEditModal = () => {
    setEditMode(prevEdit => !prevEdit);
    // const copyData = data.target_lists.slice();
    // setForm(copyData);
    // toggleModal();
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
    const res = await api.get<TargetListData>(`target_lists/${id}`);
    console.log('target_list show api', res)
    if (res) {
      setData(res.data);
    }
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
    const res = await api.post<TargetListData>(`target_lists`, formData);
    if (res) {
      setData(res.data);
      toggleModal();
    }
  }
  /** 選択した目標リストを削除する */
  const deleteTargetList = async (id: number) => {
    const res = await api.delete<TargetListData>(`target_lists/${id}`);
    if (res) {
      setData(res.data);
    }
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
  const hoge = (e: React.ChangeEvent<HTMLInputElement>, targetListId: number) => {
    // request配列をクローン
    const copyForm = form.slice().filter(form => !!form.id);
    // オブジェクト作成
    const obj = {} as TargetListAPI;
    obj.id = targetListId;
    // name属性を取得
    const target = e.target;
    if (target.name === 'targetText') {
      obj.target_text = target.value;
    }
    if (target.name === 'targetText') {
      obj.target_num = parseInt(target.value, 10);
    }
    // 配列が空だったら
    if (copyForm.length === 0) {
      copyForm.push(obj);
      setForm(copyForm);
    } else {
      const hoge = copyForm.map(form => {
        if (form.id === obj.id) {
          form = obj;
        }
        return form;
      })
      setForm(hoge);
    }
    // 
    // const copyData = data.target_lists.slice();
    // const targetData = data.target_lists.map(data => {
    //   console.log(data.id === id);
    //   if (data.id === id) {
    //     console.log(e.target.id);
    //     if (e.target.id === 'targetText') {
    //       data.target_text = e.target.value;
    //     }
    //     if (e.target.id === 'targetNum') {
    //       data.target_num = parseInt(e.target.value, 10);
    //     }
    //   }
    //   return data;
    // });
  }

  return (
    <div>
      <h1>{ data.month }月の目標リスト</h1>
      <button onClick={changeCreateModal}>新規登録</button>
      <button onClick={changeEditModal}>編集</button>
      <TargetListTable
        editMode={editMode}
        data={data.target_lists}
        onClick={deleteTargetList}
        handleHoge={hoge}
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