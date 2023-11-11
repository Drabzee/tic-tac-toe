import { useDispatch, useSelector } from '../../redux/hooks';
import { GAME_MODE, GAME_STATE, MARK } from '../../types';
import style from './style.module.scss';
import { startGame } from '../../redux/slices/dashboard';
import { getRandomMove, markBlockWithMark } from '../../utilts';
import { updateGameState } from '../../redux/slices/game';

const GameStartersContainer = () => {

    const dispatch = useDispatch();
    const playerOneMark = useSelector(state => state.dashboard.playerOneMark);

    const buttonClickHandler = (gameMode:GAME_MODE) => {
        dispatch(startGame(gameMode));

        if (gameMode === GAME_MODE.CPU && playerOneMark === MARK.O) {
            const [compRow, compCol] = getRandomMove();
            markBlockWithMark(dispatch, MARK.X, compRow, compCol);
            dispatch(updateGameState({newGameState: GAME_STATE.READY}));
        } else {
            dispatch(updateGameState({newGameState: GAME_STATE.READY}));
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