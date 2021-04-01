import { TargetList } from 'model/resModel';

interface Props {
  data: TargetList[];
  onClick: (targetListId: number) => void;
}
const TargetListTable = ({ data, onClick }: Props) => {
  const levelOfAchievement = (achievementNum: number, targetNum: number): string => {
    return `${achievementNum / targetNum * 100} %`
  }
  return (
    <div>
      <ul>
        {data.map(item => (
          <li key={item.id}>
            <p>
              1ヶ月の目標: {item.target_text}
            </p>
            <p>
              数値目標:
               {item.target_num}
            </p>
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