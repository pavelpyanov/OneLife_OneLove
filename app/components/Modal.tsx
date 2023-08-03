import { AiOutlineClose } from "react-icons/ai";
import ResultCard from "./ResultCard";
import { ResautCardoOptions } from "./MainForm";

interface Props {
  item: ResautCardoOptions | null;
  onClose: () => void;
}

const Modal: React.FC<Props> = ({ item, onClose }) => {
  if (!item) {
    return null;
  }
  return (
    <div
      onClick={onClose}
      className={`fixed top-0 bottom-0 right-0 left-0 bg-slate-900/75 z-50 ease-linear delay-200
      `}
    >
      <div className="fixed h-10/12 md:top-10 md:left-10 md:right-10 md:bottom-10 top-10 left-4 right-4 bottom-10 bg-white rounded-md">
        <button onClick={onClose} className="absolute top-4 right-4">
          <AiOutlineClose size={25} />
        </button>
        <div className="md:p-12 pt-16 p-2">
          <ResultCard resultCardOptions={item} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
