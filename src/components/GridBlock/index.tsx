import { GAME_MODE, GAME_STATE, GAME_STATUS, MARK, STREAK_TYPE } from '../../types';
import Cross from '../Cross';
import { Switch, Case, If, Then, Else } from 'react-if';
import style from './style.module.scss';
import { useState, useContext } from 'react';
import { useDispatch, useSelector } from '../../redux/hooks';
import Circle from '../Circle';
import classnames from 'classnames/bind';
import { markWin, updateGameState } from '../../redux/slices/game';
import { getComputerNextMove, markBlockWithMark } from '../../utilts';
import { markDraw } from '../../redux/slices/dashboard';
import promptModalContext from '../../contexts/promptModalContext';

type GridBlockProps = {
  markedWith: MARK | null,
  index: number,
}

const cx = classnames.bind(style);

const GridBlock = ({ markedWith, index }:GridBlockProps) => {

  const [ isHovered, setIsHovered ] = useState<boolean>(false);
  const currentMark = useSelector(state => state.dashboard.currentMark);
  const playerOneMark = useSelector(state => state.dashboard.playerOneMark);
  const opponentMark = playerOneMark === MARK.X ? MARK.O : MARK.X;
  const gameMode = useSelector(state => state.dashboard.gameMode);
  const dispatch = useDispatch();
  const { setIsModalOpen } = useContext(promptModalContext)!;

  const row = Math.floor(index / 3);
  const col = index % 3;

  const handleGameWinEvent = (markedWith: MARK, streakIndex: number, streakType: STREAK_TYPE) => {
    dispatch(updateGameState({newGameState: GAME_STATE.HALT}));
    setIsHovered(false);
    dispatch(markWin({mark: markedWith, streakIndex: streakIndex, streakType: streakType}));
    setTimeout(() => {
      setIsModalOpen(GAME_STATUS.WIN);
    }, 500);
  }

  const handleGameDrawEvent = () => {
    dispatch(updateGameState({newGameState: GAME_STATE.HALT}));
    dispatch(markDraw());
    setTimeout(() => {
      setIsModalOpen(GAME_STATUS.DRAW);
    }, 500);
  }

  const blockClickHandler = async () => {
    if (currentMark && markedWith === null) {
      setIsHovered(false);
      const gameStatus = markBlockWithMark(dispatch, currentMark, row, col, handleGameWinEvent, handleGameDrawEvent);

      if (gameStatus === GAME_STATUS.NONE && gameMode === GAME_MODE.CPU) {
        dispatch(updateGameState({newGameState: GAME_STATE.HALT}));
        const [compRow, compCol] = await getComputerNextMove(opponentMark);
        markBlockWithMark(dispatch, opponentMark, compRow, compCol, handleGameWinEvent, handleGameDrawEvent);
      }
    }
  }

  return (
    <div
      className={cx(
        'block',
        { cross: markedWith === MARK.X || markedWith === MARK.XH || (!markedWith && currentMark === MARK.X),
          circle: markedWith === MARK.O || markedWith === MARK.OH || (!markedWith && currentMark === MARK.O),
          highlighted: markedWith === MARK.XH || markedWith === MARK.OH,
          marked: markedWith !== null
        }
      )}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      onClick={blockClickHandler}
    >
      <Switch>
        <Case condition={markedWith === MARK.X || markedWith === MARK.XH}>
          <Cross size={70} type='filled' />
        </Case>
        <Case condition={markedWith === MARK.O || markedWith === MARK.OH}>
          <Circle size={70} type='filled' />
        </Case>
        <Case condition={!markedWith && isHovered}>
          <If condition={currentMark === MARK.X}>
            <Then>
              <Cross size={70} type='outlined' />
            </Then>
            <Else>
              <Circle size={70} type='outlined' />
            </Else>
          </If>
        </Case>
      </Switch>
    </div>
  )
}

export default GridBlock