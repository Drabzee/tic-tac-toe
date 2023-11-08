import { useDispatch, useSelector } from '../../redux/hooks';
import { GAME_MODE, MARK } from '../../types';
import style from './style.module.scss';
import { startGame } from '../../redux/slices/dashboard';
import { getComputerNextPosition, markBlockWithMark } from '../../utilts';

const GameStartersContainer = () => {

    const dispatch = useDispatch();
    const playerOneMark = useSelector(state => state.dashboard.playerOneMark);

    const buttonClickHandler = (gameMode:GAME_MODE) => {
        dispatch(startGame(gameMode));

        if (playerOneMark === MARK.O) {
            const [compRow, compCol] = getComputerNextPosition();
            markBlockWithMark(dispatch, MARK.X, compRow, compCol, () => {}, () => {});
        }
    }

    return (
        <div className={style.buttonContainer}>
            <button
              onClick={() => buttonClickHandler(GAME_MODE.CPU)}
            >
                NEW GAME (vs CPU)
            </button>
            <button
              onClick={() => buttonClickHandler(GAME_MODE.PERSON)}
            >
                NEW GAME (vs PLAYER)
            </button>
        </div>
    )
}

export default GameStartersContainer