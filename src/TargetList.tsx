import React from 'react';
import axios from 'axios';
import * as ResModel from './model/resModel';
// import { withRouter } from 'react-router';
import { Link } from "react-router-dom";

interface IHistory {
  pathname: string
  state: {
    target: ResModel.Target
  }
}
interface IProps {
  history: IHistory[]
}

class TargetList extends React.Component<IProps, { [value: string]: ResModel.Target[] }> {
  constructor(props: IProps) {
    super(props);
    this.state = { 
      targets: [] as ResModel.Target[]
    };
    this.createTargetList = this.createTargetList.bind(this);
    this.deleteTarget = this.deleteTarget.bind(this);
    this.handleClick = this.handleClick.bind(this)
  }
  // goToDetail(id: number, event: any) {
  //   this.props.history.push(`/target/${id}`);
  //   const history = useHistory();
  //   history.push(`/target/${id}`);
  // }
  async componentDidMount() {
    const res = await axios.get<ResModel.Target[]>('http://localhost:3005/targets');
    const data = res.data;
    this.setState({
      targets: data
    });
  }
  /**
   * 
   * @param id: number
   * @param index: number
   * @param event: any
   */
  async deleteTarget(id: number, index: number, event: any) {
    const res = await axios.delete(`http://localhost:3005/targets/${id}`);
    console.info(res.data.message);
    this.state.targets.splice(index, 1);
    this.setState({ items: this.state.targets });
  }
  handleClick(id: number, event: any) {
    const targets = this.state.targets;
    const target = targets.find((target) => target.id === id);
    if (target == null) {
      throw new Error('this path must not be reached')
    }
    this.props.history.push({
      pathname: '/target/' + id,
      state: { target: target }
    });
  }
  createTargetList() {
    const list = [];
    const targets = this.state.targets;
    for (let i in targets) {
      const id = targets[i].id; 
      const index = parseInt(i, 10);
      list.push(
        <tr key={i} onClick={(e) => this.handleClick(id, e)}>
          {/* <Link to={'/target/' + id}> */}
            <td>{id}</td>
            <td>{targets[i].achieved_text}</td>
            <td>更新</td>
            <td onClick={(e) => this.deleteTarget(id, index, e)}>削除</td>
          {/* </Link> */}
        </tr>
      );
    }
    return list;
  }
  render() {
    return (
      <div>
        <h1>達成リスト一覧</h1>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>テキスト</th>
              <th>更新</th>
              <th>削除</th>
            </tr>
          </thead>
          <tbody>
            {this.createTargetList()}
          </tbody>
        </table>
      </div>
    );
  }
}
export default TargetList;