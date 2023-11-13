import { useSelector } from "../../redux/hooks"
import { GAME_MODE, MARK } from "../../types";
import style from './style.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(style);

const ComputerIndicator = () => {
  const playerOneMark = useSelector(state => state.dashboard.playerOneMark);
  const currentMark = useSelector(state => state.dashboard.currentMark);
  const gameMode = useSelector(state => state.dashboard.gameMode);
  const isGameEnded = useSelector(({ game: { turnsCount, blockState }}) => {
      if (turnsCount === 9) return true;
  
      for (let i=0 ; i<3 ; i++) {
        for (let j=0 ; j<3 ; j++) {
          if (blockState[i][j] === MARK.OH || blockState[i][j] === MARK.XH) {
            return true;
          }
        }
      }
  
      return false;
  });

  
  return (
    <div className={
      cx(
        'indicator',
        { 'is-visible': !isGameEnded && gameMode === GAME_MODE.CPU && currentMark !== playerOneMark }
      )
    }>
        <span>Your opponent is thinking</span>
        <img src="/loader.gif" alt="loader" />
    </div>
  )
}

export default ComputerIndicator