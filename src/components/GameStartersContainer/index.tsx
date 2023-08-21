import { useDispatch } from '../../redux/hooks';
import { GAME_MODE } from '../../types';
import style from './style.module.scss';
import { startGame } from '../../redux/slices/dashboard';

const GameStartersContainer = () => {

    const dispatch = useDispatch();

    const buttonClickHandler = (gameMode:GAME_MODE) => {
        dispatch(startGame(gameMode));
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