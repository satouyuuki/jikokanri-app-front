import React from 'react';
// import axios from 'axios';
import * as ResModel from './model/resModel';
import { api } from './service/apiService';

interface IProps {
  history: string[]
}

type InputName = 'achieved_text' | 'total_time';

class Target extends React.Component<IProps, { [value: string]: any }> {
  constructor(props: IProps) {
    super(props);
    this.state = { 
      target: {
        total_time: 0,
        achieved_text: '',
        created_at: new Date,
        updated_at: new Date
      }
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.goToHome = this.goToHome.bind(this);
  }
  /** 入力情報をstateにset */
  handleInputChange(event: any) {
    event.preventDefault();
    const target = this.state.target;
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    const name: InputName = event.target.name;
    target[name] = value;
    this.setState({ target });
  }
  /** stateをreset */
  initState() {
    this.setState({
      target: {
        total_time: 0,
        achieved_text: '',
        created_at: new Date,
        updated_at: new Date
      }
    })
  }
  async handleSubmit(event: any) {
    event.preventDefault();
    const data = this.state.target;
    const res = await api.post<ResModel.Target>('targets', data);
    if (res) {
      this.initState();
      this.goToHome();
    }
  }
  goToHome() {
    this.props.history.push('/');
  }
  render() {
    return (
      <div>
        <h1>1週間の目標値</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>トータル練習時間: </label>
            <input
              type="number"
              name="total_time"
              value={this.state.target.total_time}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>達成したことリスト</label>
            <textarea
              name="achieved_text"
              value={this.state.target.achieved_text}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <input type="submit" value="送信" />
          </div>
        </form>
      </div>
    );
  }
}
export default Target;