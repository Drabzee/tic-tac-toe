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

    for (let i=0 ; i<3 ; i++) {
        if (markedRows[i] === checkSum) {
            return { gameEndedWith: GAME_STATUS.WIN, streakType: STREAK_TYPE.R, streakIndex: i }
        }
    }

    for (let i=0 ; i<3 ; i++) {
        if (markedCols[i] === checkSum) {
            return { gameEndedWith: GAME_STATUS.WIN, streakType: STREAK_TYPE.C, streakIndex: i }
        }
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

export function getComputerNextMove(markForBestMove?: MARK): Promise<[number, number]> {
    return new Promise(res => {
        setTimeout(() => {
            if (markForBestMove) {
                res(getBestPossibleMove(markForBestMove));
            } else {
                res(getRandomMove());
            }
        }, 1000);
    });
}

function getRandomMove(): [number, number] {
    const index = Math.floor(Math.random() * 9);
    const rowIndex = Math.floor(index / 3);
    const colIndex = index % 3; 
    return [rowIndex, colIndex]
}

function getBestPossibleMove(mark: MARK):[number, number] {
    const { game } = structuredClone(store.getState());

    let bestScore:number = -Infinity;
    let bestMove:[number, number] = [0, 0];
    const incrementer = mark === MARK.X ? 1 : -1;

    for (let i=0 ; i < 3 ; i++) {
        for (let j=0 ; j<3 ; j++) {
            if (game.blockState[i][j] === null) {
                updateGridArraysForMarkedBlock(mark, incrementer, i, j, game);
                const score = minimax(mark, game, 0, false);
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = [i,j];
                }
                updateGridArraysForMarkedBlock(null, -1 * incrementer, i, j, game);
            }
        }
    }

    return bestMove;
}

const SCORE = {
    WIN: 10,
    LOSS: -10,
    DRAW: 0,
}

function minimax(
    maximizerMark: MARK,
    gameData: RootState['game'],
    depth: number,
    isMaximizing: boolean
):number {
    const minimizerMark = maximizerMark === MARK.X ? MARK.O : MARK.X;
    const currentMark = isMaximizing ? maximizerMark : minimizerMark;
    const previousMark = currentMark === MARK.X ? MARK.O : MARK.X;
    const { gameEndedWith } = checkGameState(previousMark, gameData.turnsCount, gameData.rows, gameData.cols, gameData.diags);

    if (gameEndedWith !== GAME_STATUS.NONE) {
        if (gameEndedWith === GAME_STATUS.DRAW) {
            return SCORE[GAME_STATUS.DRAW];
        }
        return SCORE[previousMark === maximizerMark ? 'WIN' : 'LOSS'] - depth;
    }

    if (isMaximizing) {
        let bestScore:number = -Infinity;
        const incrementer = currentMark === MARK.X ? 1 : -1;

        for (let i=0 ; i < 3 ; i++) {
            for (let j=0 ; j<3 ; j++) {
                if (gameData.blockState[i][j] === null) {
                    updateGridArraysForMarkedBlock(currentMark, incrementer, i, j, gameData);
                    const score = minimax(maximizerMark, gameData, depth + 1, false);
                    bestScore = Math.max(bestScore, score);
                    updateGridArraysForMarkedBlock(null, -1 * incrementer, i, j, gameData);
                }
            }
        }
        return bestScore;
    } else {
        let worstScore:number = Infinity;
        const incrementer = currentMark === MARK.X ? 1 : -1;

        for (let i=0 ; i < 3 ; i++) {
            for (let j=0 ; j<3 ; j++) {
                if (gameData.blockState[i][j] === null) {
                    updateGridArraysForMarkedBlock(currentMark, incrementer, i, j, gameData);
                    const score = minimax(maximizerMark, gameData, depth + 1, true);
                    worstScore = Math.min(worstScore, score);
                    updateGridArraysForMarkedBlock(null, -1 * incrementer, i, j, gameData);
                }
            }
        }
        return worstScore;
    }
}

function updateGridArraysForMarkedBlock(
    markWith: MARK | null,
    incrementer: number,
    rowIndex: number,
    colIndex: number,
    gameData: RootState['game'],
    ) {
    const { blockState, rows, cols, diags } = gameData;
    blockState[rowIndex][colIndex] = markWith;
    rows[rowIndex] = rows[rowIndex] + incrementer;
    cols[colIndex] = cols[colIndex] + incrementer;
    if (rowIndex === colIndex) diags[0] = diags[0] + incrementer;
    if (rowIndex + colIndex === 2) diags[1] = diags[1] + incrementer;

    if (markWith === null) {
        gameData.turnsCount -= 1;
    } else {
        gameData.turnsCount += 1;
    }
}

export function getAsset(uri: string) {
    return '/' + import.meta.env.BASE_URL.replace(/(^\/|\/$)/g, '') + uri;
}