import style from './style.module.scss';
import BoardController from '../../components/BoardController';
import BoardGrid from '../../components/BoardGrid';
import ScoreBoard from '../../components/ScoreBoard';
import { Provider as PromptModalProvider } from '../../contexts/promptModalContext';
import ComputerIndicator from '../../components/ComputerIndicator';

const Board = () => {

  return (
    <div className={style.boardPage}>
      <PromptModalProvider>
        <BoardController />
        <ComputerIndicator />
        <BoardGrid />
        <ScoreBoard />
      </PromptModalProvider>
    </div>
  )
}

export default Board