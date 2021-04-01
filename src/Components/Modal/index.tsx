import "index.css";

interface Props {
  show: boolean;
  title: string;
  onClick: (e?: any) => void;
  children?: React.ReactNode;
};

const Modal = ({ show, title, onClick, children}: Props) => {
  if (show) {
    return (
      <div>
        <div id="overlay">
          <div id="content">
            <p>{title}</p>
            {children}
            <p><button onClick={onClick}>close</button></p>
          </div>
        </div>
      </div>
    )    
  } else {
    return null;
  }
};
export default Modal;