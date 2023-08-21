import { Dispatch, SetStateAction } from "react"
import ModalTemplate from "../ModalTemplate";
import style from './style.module.scss';
import { GAME_MODE, MARK } from "../../types";
import { Case, Else, If, Switch, Then } from "react-if";
import Cross from "../Cross";
import Circle from "../Circle";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "../../redux/hooks";
import { restartGame } from "../../redux/slices/game";
import { resetGame } from "../../redux/slices/dashboard";

type PromptModalProps = {
  isModalOpen: boolean,
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
}

const cx = classNames.bind(style);

const PromptModal = ({ isModalOpen, setIsModalOpen }:PromptModalProps) => {

  const gameMode = useSelector(state => state.dashboard.gameMode);
  const currentMark = useSelector(state => state.dashboard.currentMark);
  const playerOneMark = useSelector(state => state.dashboard.playerOneMark);
  const dispatch = useDispatch();

  const quitButtonClickHandler = () => {
    setIsModalOpen(false);
    dispatch(resetGame());
  }

  const restartButtonClickHandler = () => {
    setIsModalOpen(false);
    dispatch(restartGame());
  }

  return (
    <ModalTemplate isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
      <div className={style.promptModal}>
        <h4>
          <Switch>
            <Case condition={gameMode === GAME_MODE.CPU}>
              <If condition={playerOneMark === currentMark}>
                <Then>YOU WON</Then>
                <Else>OH NO, YOU LOST...</Else>
              </If>
            </Case>
            <Case condition={gameMode === GAME_MODE.PERSON}>
              <If condition={playerOneMark === currentMark}>
                <Then>PLAYER 1 WON</Then>
                <Else>PLAYER 2 WON</Else>
              </If>
            </Case>
          </Switch>
        </h4>
        <div className={cx(
          'heading',
          {
            circle: currentMark === MARK.O,
            cross: currentMark === MARK.X,
          }
        )}>
          <If condition={currentMark === MARK.X}>
            <Then>
              <Cross type='filled' size={64} />
            </Then>
            <Else>
              <Circle type='filled' size={64} />
            </Else>
          </If>
          <span>TAKES THE ROUND</span>
        </div>
        <div className={style.ctaContainer}>
          <button onClick={quitButtonClickHandler}>QUIT</button>
          <button onClick={restartButtonClickHandler}>NEXT ROUND</button>
        </div>
      </div>
    </ModalTemplate>
  );
}

export default PromptModal