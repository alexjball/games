import { createSlice } from "@reduxjs/toolkit";
import { shallowEqual, useSelector } from "react-redux";

export interface State {
  muted: boolean;
}

const initialState: State = { muted: true };

const slice = createSlice({
  name: "audio",
  initialState,
  reducers: {
    toggleMute(state) {
      state.muted = !state.muted;
    },
  },
});

export const useAudio = () =>
  useSelector(({ audio }: { audio: State }) => audio, shallowEqual);

export const { toggleMute } = slice.actions;
export default slice.reducer;
