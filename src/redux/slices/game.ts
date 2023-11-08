import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GAME_STATE, MARK, STREAK_TYPE } from '../../types';
import { resetGame } from './dashboard';

type TBlockState = MARK | null;

type TGame = {
    blockState: [
        [TBlockState, TBlockState, TBlockState],
        [TBlockState, TBlockState, TBlockState],
        [TBlockState, TBlockState, TBlockState],
    ],
    rows: [number, number, number],
    cols: [number, number, number],
    diags: [number, number],
    turnsCount: number,
    gameState: GAME_STATE
};

const initialGameState:TGame = {
    blockState: [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ],
    rows: [0, 0, 0],
    cols: [0, 0, 0],
    diags: [0, 0],
    turnsCount: 0,
    gameState: GAME_STATE.HALT,
};

const gameSlice = createSlice({
    name: 'game',
    initialState: initialGameState,
    reducers: {
        markBlock: (state, action:PayloadAction<{markedRow:number, markedCol: number, currentMark:MARK}>) => {
            let incrementer = 1;
            const { markedRow, markedCol, currentMark } = action.payload;

            state.blockState[markedRow][markedCol] = currentMark;

            if (currentMark === MARK.O) {
                incrementer *= -1;
            }

            state.rows[markedRow] += incrementer;
            state.cols[markedCol] += incrementer;

            if (markedRow === markedCol) state.diags[0] += incrementer;
            if (markedRow + markedCol === 2) state.diags[1] += incrementer;

            state.turnsCount++;
        },
        restartGame: () => initialGameState,
        markWin: (state, action: PayloadAction<{mark:MARK, streakType:STREAK_TYPE, streakIndex: number}>) => {
            let higlightedMark:MARK;
            if (action.payload.mark === MARK.X) {
                higlightedMark = MARK.XH;
            } else {
                higlightedMark = MARK.OH;
            }
            switch(action.payload.streakType) {
                case STREAK_TYPE.R: {
                    for (let i=0 ; i<3 ; i++) {
                        state.blockState[action.payload.streakIndex][i] = higlightedMark;
                    }
                    break;
                }
                case STREAK_TYPE.C: {
                    for (let i=0 ; i<3 ; i++) {
                        state.blockState[i][action.payload.streakIndex] = higlightedMark;
                    }
                    break;
                }
                case STREAK_TYPE.D: {
                    for (let i=0 ; i<3 ; i++) {
                        const j = action.payload.streakIndex === 0 ? i : (2 - i);
                        state.blockState[i][j] = higlightedMark;
                    }
                }
            }
        },
        updateGameState: (state, action: PayloadAction<{newGameState: GAME_STATE}>) => {
            state.gameState = action.payload.newGameState
        }
    },
    extraReducers: builder => {
        builder.addCase(resetGame, () => initialGameState);
    }
});

export default gameSlice.reducer;
export const { markBlock, restartGame, markWin, updateGameState } = gameSlice.actions;