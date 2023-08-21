import { MARK } from '../../types';
import Cross from '../Cross';
import { Switch, Case, If, Then, Else } from 'react-if';
import style from './style.module.scss';
import { useState, useContext } from 'react';
import { useDispatch, useSelector } from '../../redux/hooks';
import Circle from '../Circle';
import classnames from 'classnames/bind';
import { markBlock, markWin } from '../../redux/slices/game';
import { checkWinner } from '../../utilts';
import { markDraw, toggleTurn } from '../../redux/slices/dashboard';
import promptModalContext from '../../contexts/promptModalContext';

type GridBlockProps = {
  markedWith: MARK | null,
  index: number,
}

const cx = classnames.bind(style);

const GridBlock = ({ markedWith, index }:GridBlockProps) => {

  const [ isHovered, setIsHovered ] = useState<boolean>(false);
  const currentMark = useSelector(state => state.dashboard.currentMark);
  const turnsCount = useSelector(state => state.game.turnsCount);
  const dispatch = useDispatch();
  const { setIsModalOpen } = useContext(promptModalContext)!;

  const row = Math.floor(index / 3);
  const col = index % 3;

  const blockClickHandler = () => {
    if (currentMark && markedWith === null) {
      dispatch(markBlock({ markedRow: row, markedCol: col, currentMark }));
      const {isWinner, streakType, streakIndex} = checkWinner(currentMark, row, col);

      if (isWinner) {
        setIsHovered(false);
        dispatch(markWin({mark: currentMark, streakIndex: streakIndex, streakType: streakType}));
        setTimeout(() => {
          setIsModalOpen(true);
        }, 500);
      } else if (turnsCount === 9) {
        dispatch(markDraw());
        setTimeout(() => {
          setIsModalOpen(true);
        }, 500);
      } else {
        dispatch(toggleTurn());
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