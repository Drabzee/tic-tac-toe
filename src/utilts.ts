import { MARK, STREAK_TYPE } from "./types";
import store, { AppDispatch, RootState } from './redux/store';
import { markBlock } from "./redux/slices/game";
import { toggleTurn } from "./redux/slices/dashboard";

export function markBlockWithMark(
    dispatch: AppDispatch,
    markWith: MARK,
    rowIndex: number,
    colIndex: number,
    onWinCallback: (markedWith: MARK, streakIndex: number, streakType: STREAK_TYPE) => void,
    onDrawCallback: () => void,
) {
    dispatch(markBlock({ markedRow: rowIndex, markedCol: colIndex, currentMark: markWith }));
    const {game: { rows, cols, diags, turnsCount }} = store.getState();
    const { gameEndedWith, streakType, streakIndex } = checkGameState(
        markWith,
        turnsCount,
        rows,
        cols,
        diags,
        rowIndex,
        colIndex
    );

    if (gameEndedWith === 'WIN') {
        onWinCallback(markWith, streakIndex, streakType);
    } else if (gameEndedWith === 'DRAW') {
        onDrawCallback();
    } else {
        dispatch(toggleTurn());
    }
}

export function checkGameState(
    currentMark:MARK,
    turnsCount: number,
    markedRows: RootState['game']['rows'],
    markedCols: RootState['game']['cols'],
    markedDiags: RootState['game']['diags'],
    row:number,
    col:number
):{
    gameEndedWith: 'DRAW' | 'NONE',
    streakType: null,
    streakIndex: null
} | {
    gameEndedWith: 'WIN',
    streakType: STREAK_TYPE,
    streakIndex: number
} {
    let checkSum:(3|-3);
    if (currentMark === MARK.X) checkSum = 3;
    else checkSum = -3;

    if (markedRows[row] === checkSum) {
        return { gameEndedWith: 'WIN', streakType: STREAK_TYPE.R, streakIndex: row }
    }

    if (markedCols[col] === checkSum) {
        return { gameEndedWith: 'WIN', streakType: STREAK_TYPE.C, streakIndex: col }
    }

    if (markedDiags[0] === checkSum) {
        return { gameEndedWith: 'WIN', streakType: STREAK_TYPE.D, streakIndex: 0 }
    }

    if (markedDiags[1] === checkSum) {
        return { gameEndedWith: 'WIN', streakType: STREAK_TYPE.D, streakIndex: 1 }
    }

    if (turnsCount === 9) {
        return { gameEndedWith: 'DRAW', streakType: null, streakIndex: null }
    }

    return { gameEndedWith: 'NONE', streakType: null, streakIndex: null }
}

export function getComputerNextPosition():[number, number] {
    const { game: { blockState } } = store.getState();
    for (let i=0 ; i < 3 ; i++) {
        for (let j=0 ; j<3 ; j++) {
            if (blockState[i][j] === null) {
                return [i,j];
            }
        }
    }
    return [0,0];
}