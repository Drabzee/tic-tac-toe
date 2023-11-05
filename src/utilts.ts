import { MARK, STREAK_TYPE } from "./types";
import store from './redux/store';

export function checkWinner(currentMark:MARK, row:number, col:number):{
    isWinner: false,
    streakType: null,
    streakIndex: null
} | {
    isWinner: true,
    streakType: STREAK_TYPE,
    streakIndex: number
} {
    let checkSum:(3|-3);
    if (currentMark === MARK.X) checkSum = 3;
    else checkSum = -3;

    const {
        game: {
            rows: markedRows,
            cols: markedCols,
            diags: markedDiags,
        }
    } = store.getState();

    if (markedRows[row] === checkSum) {
        return { isWinner: true, streakType: STREAK_TYPE.R, streakIndex: row }
    }

    if (markedCols[col] === checkSum) {
        return { isWinner: true, streakType: STREAK_TYPE.C, streakIndex: col }
    }

    if (markedDiags[0] === checkSum) {
        return { isWinner: true, streakType: STREAK_TYPE.D, streakIndex: 0 }
    }

    if (markedDiags[1] === checkSum) {
        return { isWinner: true, streakType: STREAK_TYPE.D, streakIndex: 1 }
    }

    return { isWinner: false, streakType: null, streakIndex: null }
}

export function checkIsDraw():boolean {
    const {
        game: { turnsCount }
    } = store.getState();

    return turnsCount === 9;
}