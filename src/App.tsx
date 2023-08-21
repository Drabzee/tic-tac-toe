import { If, Then, Else } from "react-if";
import Home from "./pages/Home"
import { useSelector } from "./redux/hooks"
import Board from "./pages/Board";

function App() {

  const isGameStarted = useSelector(state => state.dashboard.isGameStarted);

  return (
    <>
      <If condition={isGameStarted}>
        <Then>
          <Board />
        </Then>
        <Else>
          <Home />
        </Else>
      </If>
    </>
  )
}

export default App
