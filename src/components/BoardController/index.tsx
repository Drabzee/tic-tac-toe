import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateRight, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Circle from '../../components/Circle';
import style from './style.module.scss';
import { useDispatch, useSelector } from '../../redux/hooks';
import { MARK } from '../../types';
import { If, Then, Else } from 'react-if';
import Cross from '../Cross';
import { resetGame } from '../../redux/slices/dashboard';
import { restartGame } from '../../redux/slices/game';

const BoardController = () => {

    const currentMark = useSelector(state => state.dashboard.currentMark);
    const dispatch = useDispatch();

    return (
        <div className={style.header}>
            <button onClick={() => dispatch(resetGame())}>
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
            </button>
            <div className={style.turnIndicator}>
                <If condition={currentMark === MARK.X}>
                    <Then>
                        <Cross type='filled' size={20} />
                    </Then>
                    <Else>
                        <Circle type='filled' size={20} />
                    </Else>
                </If>
                <span>Turn</span>
            </div>
            <button onClick={() => dispatch(restartGame())}>
                <FontAwesomeIcon icon={faArrowRotateRight} />
            </button>
        </div>
    )
}

export default BoardController