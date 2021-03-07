import React from 'react';
import axios from 'axios';
// import * as RequestModel from './model/requestModel';
class Target extends React.Component<{}, { [value: string]: any }> {
  constructor(props: string) {
    super(props);
    this.state = { 
      total_time: 0,
      achieved_text: '',
      created_at: new Date,
      updated_at: new Date
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  /** 入力情報をstateにset */
  handleInputChange(event: any) {
    event.preventDefault();
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  async handleSubmit(event: any) {
    event.preventDefault();
    const data = this.state;
    const res = await axios.post('http://localhost:3005/targets', data);
    console.log(res);
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
              value={this.state.totalTime}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>達成したことリスト</label>
            <textarea
              name="achieved_text"
              value={this.state.achieved_text}
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