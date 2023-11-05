import { createContext, useState, Dispatch, SetStateAction, ReactNode } from "react";
import PromptModal from "../components/PromptModal";
import { GAME_STATUS } from "../types";

export type TPromptModalStatus = false | GAME_STATUS;

const promptModalContext = createContext<{ isModalOpen:TPromptModalStatus, setIsModalOpen:Dispatch<SetStateAction<TPromptModalStatus>> } | null>(null);

export const Provider = ({ children }:{ children:ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState<TPromptModalStatus>(false);

  return (
    <promptModalContext.Provider value={{isModalOpen, setIsModalOpen}}>
      { children }
      <PromptModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </promptModalContext.Provider>
  );
}

export default promptModalContext