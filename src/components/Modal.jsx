import { useModal } from "../components/TransactionProvider";
import ModalStyles from "../styles/Modal.module.css";

export default function Modal({ children }) {
  const { showModal, isModalOpen } = useModal();

  return (
    <div className={` ${isModalOpen ? "" : ModalStyles.hide}`}>
      <div className={`${ModalStyles.overlay}`}></div>
      <div className={ModalStyles["overlay-cont-container"]}>
        <div className={ModalStyles["overlay-cont"]}>{children}</div>
      </div>
    </div>
  );
}
