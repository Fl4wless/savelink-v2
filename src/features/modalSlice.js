import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showModal: false,
  linkInfo: [],
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal: (state) => {
      state.showModal = true;
    },
    hideModal: (state) => {
      state.showModal = false;
    },
    setLinkInfo: (state, action) => {
      state.linkInfo = action.payload;
    },
  },
});

export const { showModal, hideModal, setLinkInfo } = modalSlice.actions;

export const selectModal = (state) => state.modal.showModal;
export const selectLinkInfo = (state) => state.modal.linkInfo;

export default modalSlice.reducer;
