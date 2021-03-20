import React from 'react';
// import axios from 'axios';
import * as ResModel from './model/resModel';
// import { useParams } from 'react-router-dom';
interface IProps {
  location: any;
  history: string[]
}

class TargetDetail extends React.Component<IProps, { [value: string]: ResModel.Target }> {
  constructor(props: IProps) {
    super(props);
    const target = this.props.location.state.target;
    this.state = { 
      target: target
    };
    this.goToHome = this.goToHome.bind(this);
  }
  goToHome() {
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <h1>達成リスト一覧</h1>
        <button onClick={this.goToHome}>戻る</button>
        <p>ID: {this.state.target.id}</p>
        <p>トータル時間: {this.state.target.total_time}</p>
        <p>達成事項: {this.state.target.achieved_text}</p>
        <p>作成日: {this.state.target.created_at}</p>
        <p>更新日: {this.state.target.updated_at}</p>
      </div>
    );
  }
}
export default TargetDetail;