import { GAME_STATE, GAME_STATUS, MARK, STREAK_TYPE } from "./types";
import store, { AppDispatch, RootState } from './redux/store';
import { markBlock, updateGameState } from "./redux/slices/game";
import { toggleTurn } from "./redux/slices/dashboard";

export function markBlockWithMark(
    dispatch: AppDispatch,
    markWith: MARK,
    rowIndex: number,
    colIndex: number,
    onWinCallback: ((markedWith: MARK, streakIndex: number, streakType: STREAK_TYPE) => void) | null = null,
    onDrawCallback: (() => void) | null = null,
): GAME_STATUS {
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

    if (gameEndedWith === GAME_STATUS.WIN && onWinCallback) {
        onWinCallback(markWith, streakIndex, streakType);
    } else if (gameEndedWith === GAME_STATUS.DRAW && onDrawCallback) {
        onDrawCallback();
    } else {
        dispatch(toggleTurn());
        dispatch(updateGameState({newGameState: GAME_STATE.READY}));
    }

    return gameEndedWith;
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
    gameEndedWith: GAME_STATUS.DRAW | GAME_STATUS.NONE,
    streakType: null,
    streakIndex: null
} | {
    gameEndedWith: GAME_STATUS.WIN,
    streakType: STREAK_TYPE,
    streakIndex: number
} {
    let checkSum:(3|-3);
    if (currentMark === MARK.X) checkSum = 3;
    else checkSum = -3;

    if (markedRows[row] === checkSum) {
        return { gameEndedWith: GAME_STATUS.WIN, streakType: STREAK_TYPE.R, streakIndex: row }
    }

    if (markedCols[col] === checkSum) {
        return { gameEndedWith: GAME_STATUS.WIN, streakType: STREAK_TYPE.C, streakIndex: col }
    }

    if (markedDiags[0] === checkSum) {
        return { gameEndedWith: GAME_STATUS.WIN, streakType: STREAK_TYPE.D, streakIndex: 0 }
    }

    if (markedDiags[1] === checkSum) {
        return { gameEndedWith: GAME_STATUS.WIN, streakType: STREAK_TYPE.D, streakIndex: 1 }
    }

    if (turnsCount === 9) {
        return { gameEndedWith: GAME_STATUS.DRAW, streakType: null, streakIndex: null }
    }

    return { gameEndedWith: GAME_STATUS.NONE, streakType: null, streakIndex: null }
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