import { TargetList } from 'model/resModel';
// import { Link, RouteComponentProps } from 'react-router-dom';

interface Props {
  data: TargetList[];
  onClick: (targetListId: number) => void;
}
const TargetListTable = ({ data, onClick }: Props) => {
  console.log('TargetListTable data', data);
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
            <button onClick={() => onClick(item.id)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  )
};
export default TargetListTable;