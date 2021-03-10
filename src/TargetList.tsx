import React from 'react';
import axios from 'axios';
import * as ResModel from './model/resModel';

interface IHistory {
  pathname: string
  state?: {
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
    this.goToDetail = this.goToDetail.bind(this)
    this.goToCreate = this.goToCreate.bind(this)
    this.goToEdit = this.goToEdit.bind(this)
  }
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
    event.stopPropagation();
    const res = await axios.delete(`http://localhost:3005/targets/${id}`);
    this.state.targets.splice(index, 1);
    this.setState({ items: this.state.targets });
  }
  goToEdit(id: number, event: any) {
    event.stopPropagation();
    const targets = this.state.targets;
    const target = targets.find((target) => target.id === id);
    if (target == null) {
      throw new Error('this path must not be reached')
    }
    this.props.history.push({
      pathname: '/target/edit/' + id,
      state: { target: target }
    });
  }
  goToDetail(id: number, event: any) {
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
  goToCreate() {
    this.props.history.push({
      pathname: '/target/create'
    });
  }
  createTargetList() {
    const list = [];
    const targets = this.state.targets;
    for (let i in targets) {
      const id = targets[i].id; 
      const index = parseInt(i, 10);
      list.push(
        <tr key={i} onClick={(e) => this.goToDetail(id, e)}>
          <td>{id}</td>
          <td>{targets[i].achieved_text}</td>
          <td onClick={(e) => this.goToEdit(id, e)}>更新</td>
          <td onClick={(e) => this.deleteTarget(id, index, e)}>削除</td>
        </tr>
      );
    }
    return list;
  }
  render() {
    return (
      <div>
        <h1>達成リスト一覧</h1>
        <button onClick={this.goToCreate}>新しく入力</button>
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