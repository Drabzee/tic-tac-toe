import { useSelector } from '../../redux/hooks';
import { GAME_STATE } from '../../types';
import GridBlock from '../GridBlock';
import style from './style.module.scss';
import classnames from 'classnames/bind';

const cx = classnames.bind(style);

const BoardGrid = () => {

  const blockState = useSelector(state => state.game.blockState);
  const gameState = useSelector(state => state.game.gameState);

  return (
    <div
      className={cx(
        'grid',
        { halted: gameState === GAME_STATE.HALT }
      )}
    >
        { blockState.flat().map((mark, index) => (
            <GridBlock
              key={index}
              index={index}
              markedWith={mark}
            />
        )) }
    </div>
  )
}

export default BoardGrid