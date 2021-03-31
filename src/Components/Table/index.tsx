import { Month } from 'model/resModel';
import { Link, RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps{
  data: Month[]
}
const Form = (props: Props) => {
  return (
    <div>
      <ul>
        {props.data.map(item => (
          <li key={item.id}>
            <Link to={{ pathname: `target/${item.id}` }}>
              {item.year}年{item.month}月の目標値
            </Link>
            <button>削除</button>
            <ul>
              {item.weeks.map(week => (
                <li key={week.id}>
                  <Link to={{ pathname: `done/${week.id}` }}>
                    {week.week}週目の達成値                    
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
};
export default Form;