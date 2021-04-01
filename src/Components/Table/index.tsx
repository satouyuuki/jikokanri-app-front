import { Month } from 'model/resModel';
import { Link, RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps{
  data: Month[];
  onClick: (monthId: number) => void;
}
const Form = ({data, onClick}: Props) => {
  return (
    <div>
      {data.map(month => (
        <details key={month.id}>
          <summary>{month.year}年{month.month}月</summary>
          <p>
            <Link to={{ pathname: `target/${month.id}` }}>
              {month.year}年{month.month}月の目標値
            </Link>
          </p>
          {month.weeks.map(week => (
            <p key={week.id}>
              <Link to={{ pathname: `done/${week.id}` }}>
                {week.week}週目の達成値
              </Link>
            </p>
          ))}
          <button onClick={() => onClick(month.id)}>削除</button>
        </details>
      ))}
    </div>
  )
};
export default Form;