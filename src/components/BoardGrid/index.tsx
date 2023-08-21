import { useSelector } from '../../redux/hooks';
import GridBlock from '../GridBlock';
import style from './style.module.scss';

const BoardGrid = () => {

  const gameState = useSelector(state => state.game.blockState);

  return (
    <div className={style.grid}>
        { gameState.flat().map((mark, index) => (
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