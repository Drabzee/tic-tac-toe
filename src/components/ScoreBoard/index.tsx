import { useSelector } from '../../redux/hooks';
import { GAME_MODE, MARK } from '../../types';
import style from './style.module.scss';
import classnames from 'classnames/bind';

const cx = classnames.bind(style);

const ScoreBoard = () => {

  const scoreCard = useSelector(state => state.dashboard.scoreCard);
  const playerOneMark = useSelector(state => state.dashboard.playerOneMark);
  const gameMode = useSelector(state => state.dashboard.gameMode);

  return (
    <div className={style.scoreBoard}>
        <div
          className={cx({
            cross: playerOneMark === MARK.X,
            circle: playerOneMark === MARK.O
          })}
        >
            <span>P1 ({playerOneMark === MARK.X ? 'X' : 'O'})</span>
            <h4>{ scoreCard[1] }</h4>
        </div>
        <div className={style.ties}>
            <span>TIES</span>
            <h4>{ scoreCard[0] }</h4>
        </div>
        <div
          className={cx({
            circle: playerOneMark === MARK.X,
            cross: playerOneMark === MARK.O,
          })}
        >
            <span>{gameMode === GAME_MODE.PERSON ? 'P2' : 'CPU'} ({playerOneMark === MARK.X ? 'O' : 'X'})</span>
            <h4>{ scoreCard[2] }</h4>
        </div>
    </div>
  )
}

export default ScoreBoard