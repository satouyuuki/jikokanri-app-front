import React from 'react';
import axios from 'axios';
import * as ResModel from './model/resModel';
// import { useParams } from 'react-router-dom';

class TargetDetail extends React.Component<{}, { [value: string]: ResModel.Target }> {
  constructor(props: string) {
    super(props);
    this.state = { 
      target: {
        id: 0,
        total_time: 0,
        achieved_text: '',
        created_at: '',
        updated_at: ''
      }
    };
  }
  async componentDidMount() {
    const res = await axios.get<ResModel.Target>('http://localhost:3005/targets/');
    const data = res.data;
    this.setState({
      target: data
    });
  }
  render() {
    return (
      <div>
        <h1>達成リスト一覧</h1>
        <p>{this.state.target.id}</p>
        <p>{this.state.target.total_time}</p>
        <p>{this.state.target.achieved_text}</p>
        <p>{this.state.target.created_at}</p>
        <p>{this.state.target.updated_at}</p>
      </div>
    );
  }
}
export default TargetDetail;