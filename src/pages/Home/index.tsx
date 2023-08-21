import style from './style.module.scss'
import Cross from '../../components/Cross';
import Circle from '../../components/Circle';
import MarkSelectionPanel from '../../components/MarkSelectionPanel';
import GameStartersContainer from '../../components/GameStartersContainer';

const Home = () => {

  return (
    <div className={style.homePage}>
      <div className={style.header}>
        <Cross size={30} type='filled' />
        <Circle size={30} type='filled' />
      </div>
      <MarkSelectionPanel />
      <GameStartersContainer />
    </div>
  )
}

export default Home