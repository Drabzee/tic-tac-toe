import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MARK, GAME_MODE } from '../../types';
import { markWin, restartGame } from './game';

type TDashboardState = {
    playerOneMark: MARK,
    gameMode: GAME_MODE | null,
    isGameStarted: boolean,
    currentMark: MARK | null,
    scoreCard: [number, number, number],
}

const initialDashboardState:TDashboardState = {
    playerOneMark: MARK.O,
    gameMode: null,
    isGameStarted: false,
    currentMark: null,
    scoreCard: [0, 0, 0],
};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: initialDashboardState,
    reducers: {
        selectMark: (state, action: PayloadAction<MARK>) => {
            state.playerOneMark = action.payload
        },
        startGame: (state, action: PayloadAction<GAME_MODE>) => {
            state.gameMode = action.payload;
            state.isGameStarted = true;
            state.currentMark = MARK.X;
        },
        toggleTurn: (state) => {
            if (state.currentMark === MARK.X) {
                state.currentMark = MARK.O;
            } else {
                state.currentMark = MARK.X;
            }
        },
        resetGame: () => initialDashboardState,
        markDraw: (state) => {
            state.scoreCard[0]++;
        }
    },
    extraReducers: builder => {
        builder.addCase(restartGame, state => {
            state.currentMark = MARK.X
        });
        builder.addCase(markWin, (state, action) => {
            if (action.payload.mark === state.playerOneMark) {
                state.scoreCard[1]++;
            } else {
                state.scoreCard[2]++;
            }
        });
    }
});

export default dashboardSlice.reducer;
export const { selectMark, startGame, resetGame, toggleTurn, markDraw } = dashboardSlice.actions;