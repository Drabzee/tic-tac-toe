import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRotateRight,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import Circle from "../../components/Circle";
import style from "./style.module.scss";
import { useDispatch, useSelector } from "../../redux/hooks";
import { GAME_MODE, GAME_STATE, MARK } from "../../types";
import { If, Then, Else } from "react-if";
import Cross from "../Cross";
import { resetGame } from "../../redux/slices/dashboard";
import { restartGame, updateGameState } from "../../redux/slices/game";
import { getComputerNextPosition, markBlockWithMark } from "../../utilts";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

const BoardController = () => {
  const currentMark = useSelector((state) => state.dashboard.currentMark);
  const gameMode = useSelector((state) => state.dashboard.gameMode);
  const playerOneMark = useSelector((state) => state.dashboard.playerOneMark);
  const gameState = useSelector((state) => state.game.gameState);
  const dispatch = useDispatch();

  const restartButtonClickHandler = () => {
    dispatch(restartGame());
    if (gameMode === GAME_MODE.CPU && playerOneMark === MARK.O) {
      const [compRow, compCol] = getComputerNextPosition();
      markBlockWithMark(dispatch, MARK.X, compRow, compCol);
      dispatch(updateGameState({ newGameState: GAME_STATE.READY }));
    } else {
      dispatch(updateGameState({ newGameState: GAME_STATE.READY }));
    }
  };

  return (
    <div
      className={cx("header", {
        halted: gameState === GAME_STATE.HALT,
      })}
    >
      <button onClick={() => dispatch(resetGame())}>
        <FontAwesomeIcon icon={faArrowRightFromBracket} />
      </button>
      <div className={style.turnIndicator}>
        <If condition={currentMark === MARK.X}>
          <Then>
            <Cross type="filled" size={20} />
          </Then>
          <Else>
            <Circle type="filled" size={20} />
          </Else>
        </If>
        <span>Turn</span>
      </div>
      <button onClick={restartButtonClickHandler}>
        <FontAwesomeIcon icon={faArrowRotateRight} />
      </button>
    </div>
  );
};

export default BoardController;
