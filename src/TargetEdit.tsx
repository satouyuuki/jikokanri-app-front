import React from 'react';
// import axios from 'axios';
// import * as RequestModel from './model/requestModel';
import * as ResModel from './model/resModel';
import { api } from './service/apiService';

interface IProps {
  location: any;
  history: string[];
  match: any;
}

type InputName = 'achieved_text' | 'total_time';

class Target extends React.Component<IProps, { [value: string]: any }> {
  constructor(props: IProps) {
    super(props);
    const target: any = props.location.state.target;
    this.state = { 
      target: target
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
    this.setState({target});
  }

  async handleSubmit(event: any) {
    event.preventDefault();
    const id = this.props.match.params.id;
    const data = this.state.target;
    const res = await api.put<ResModel.Target>(`targets/${id}`, data);
    if (res) {
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