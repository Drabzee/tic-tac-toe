import { useRef } from 'react';
import { useSelector } from '../../redux/hooks';
import GridBlock from '../GridBlock';
import style from './style.module.scss';

const BoardGrid = () => {

  const boardRef = useRef<HTMLDivElement>(null);
  const blockState = useSelector(state => state.game.blockState);

  return (
    <div ref={boardRef} className={style.grid}>
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