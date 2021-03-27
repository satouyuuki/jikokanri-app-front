interface Props {
  inputMonths: (e: any) => void;
  onClick: () => Promise<void>;
}
const Form = ({ inputMonths, onClick }: Props) => {
    return (
      <div>
        <label htmlFor="year">年: </label>
        <input
          id="year"
          type="number"
          min="2021"
          max="2099"
          step="1"
          placeholder="2021"
          onChange={(e) => inputMonths(e)}
        />
        <label htmlFor="month">月: </label>
        <input
          id="month"
          type="number"
          min="1"
          max="12"
          step="1"
          placeholder="1"
          onChange={(e) => inputMonths(e)}
        />
        <button onClick={onClick}>送信</button>
      </div>
    )
};
export default Form;