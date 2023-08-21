import style from './style.module.scss';
import { useSelector, useDispatch } from '../../redux/hooks'
import { MARK } from '../../types';
import classnames from 'classnames/bind';
import { selectMark } from '../../redux/slices/dashboard';
import Cross from '../Cross';
import Circle from '../Circle';

const cx = classnames.bind(style);

const MarkSelectionPanel = () => {

  const playerOneMark = useSelector(state => state.dashboard.playerOneMark);
  const dispatch = useDispatch();

  const markClickHandler = (mark: MARK) => dispatch(selectMark(mark));

  return (
    <div className={style.selectionPanel}>
      <h4>Pick player 1's mark</h4>
      <div className={style.selector}>
        <span
          onClick={() => markClickHandler(MARK.X)}
          className={cx({ active: playerOneMark === MARK.X })}
        >
          <Cross size={30} type='filled' />
        </span>

        <span
          onClick={() => markClickHandler(MARK.O)}
          className={cx({ active: playerOneMark === MARK.O })}
        >
          <Circle size={30} type='filled' />
        </span>
      </div>
      <p>Remember: X goes first</p>
    </div>
  )
}

export default MarkSelectionPanel