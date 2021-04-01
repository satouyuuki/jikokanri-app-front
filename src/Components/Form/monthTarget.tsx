import { TargetListAPI } from 'model/requestModel';

interface Props {
  inputMonths: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  createMonth: () => Promise<void>;
  onAddForm: () => void;
  onDeleteForm: (index: number) => void;
  form: TargetListAPI[];
}
const MonthTargetForm = ({ form, inputMonths, createMonth, onAddForm, onDeleteForm }: Props) => {
  return (
    <div>
      {form.map((item, index) => (
        <div key={index}>
          <label htmlFor="targetText">目標リスト: </label>
          <input
            id="targetText"
            type="text"
            placeholder="1ヶ月の目標"
            onChange={(e) => inputMonths(e, index)}
            value={item.target_text}
          />
          <label htmlFor="targetNum">数的目標: </label>
          <input
            id="targetNum"
            type="number"
            step="1"
            placeholder="1"
            onChange={(e) => inputMonths(e, index)}
            value={item.target_num | 0}
          />
          <button onClick={() => onDeleteForm(index)}>削除</button>
        </div>
      ))}
      <button onClick={onAddForm}>追加</button>
      <button onClick={createMonth}>送信</button>
    </div>
  )
};
export default MonthTargetForm;