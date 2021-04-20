import { TargetList } from 'model/resModel';

interface Props {
  data: TargetList[];
  editMode: boolean;
  onClick: (targetListId: number) => void;
  handleHoge: (e: React.ChangeEvent<HTMLInputElement>, id: number) => void;
}
const TargetListTable = ({ data, onClick, editMode, handleHoge }: Props) => {
  const levelOfAchievement = (achievementNum: number, targetNum: number): string => {
    return `${achievementNum / targetNum * 100} %`
  }
  return (
    <div>
      <ul>
        {data.map(item => (
          <li key={item.id}>
            {
              editMode
                ?
                <input
                  type="text"
                  name="targetText"
                  defaultValue={item.target_text}
                  onChange={(e) => handleHoge(e, item.id)}
                />
                :
                <p>
                  1ヶ月の目標: {item.target_text}
                </p>
            }
            {
              editMode
                ?
                <input
                  type="number"
                  name="targetNum"
                  defaultValue={item.target_num}
                  onChange={(e) => handleHoge(e, item.id)}
                />
                :
                <p>
                  数値目標:
                  {item.target_num}
                </p>
            }
            <p>
              達成値:
               {item.done_num_sum}
            </p>
            <p>
              達成パーセント
               {levelOfAchievement(item.done_num_sum, item.target_num)}
            </p>
            <button onClick={() => onClick(item.id)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  )
};
export default TargetListTable;