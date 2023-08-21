import { createContext, useState, Dispatch, SetStateAction, ReactNode } from "react";
import PromptModal from "../components/PromptModal";

const promptModalContext = createContext<{ isModalOpen:boolean, setIsModalOpen:Dispatch<SetStateAction<boolean>> } | null>(null);

export const Provider = ({ children }:{ children:ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <promptModalContext.Provider value={{isModalOpen, setIsModalOpen}}>
      { children }
      <PromptModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </promptModalContext.Provider>
  );
}

export default promptModalContext