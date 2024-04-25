import { parseAsCamel } from '../../../../utils/schemas';
import { WindowManager, WindowManagerSchema } from '../../../../utils/schemas/WindowManager';
import { createSlice } from '@reduxjs/toolkit';

import { matcher, reducersFor, selectorsFor } from '../../shared/utils/app';
import { BorderSlice } from '../border/app';
import { ContainerTopBarSlice } from '../containerTopBar/app';

let initialState: WindowManager = parseAsCamel(WindowManagerSchema, {});

export const SeelenManagerSlice = createSlice({
  name: 'seelenManagerSettings',
  initialState,
  selectors: selectorsFor(initialState),
  reducers: {
    ...reducersFor(initialState),
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(matcher(BorderSlice), (state, action) => {
        state.border = BorderSlice.reducer(state.border, action);
      })
      .addMatcher(matcher(ContainerTopBarSlice), (state, action) => {
        state.containerTopBar = ContainerTopBarSlice.reducer(state.containerTopBar, action);
      });
  },
});

export const WManagerSettingsActions = SeelenManagerSlice.actions;
