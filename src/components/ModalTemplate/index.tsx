import { Dispatch, SetStateAction, ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import style from './style.module.scss';

type ModalTemplateProps = {
    isModalOpen: boolean,
    setIsModalOpen: Dispatch<SetStateAction<boolean>>,
    children: ReactNode,
}

const ModalTemplate = ({ isModalOpen, children }:ModalTemplateProps) => {

    useEffect(() => {
      const rootModalDOM = document.getElementById('modal')!;
      if (isModalOpen) {
        document.body.style.overflowY = 'hidden';
      } else if (rootModalDOM.childNodes.length === 0) {
        document.body.style.overflowY = 'initial';
      }
    
      return () => {
        if (rootModalDOM.childNodes.length === 0) {
          document.body.style.overflowY = 'initial';
        }
      }
    }, [isModalOpen])
    

    return isModalOpen ? createPortal((
        <>
            <div className={style.backdrop}></div>
            <div className={style.content}>
                { children }
            </div>
        </>
    ), document.getElementById('modal') as HTMLDivElement): null;
}

export default ModalTemplate