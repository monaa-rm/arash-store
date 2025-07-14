import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  orderProducts: [],
  clientName: "",
  clientLastName: "",
  clientProvince: {},
  clientCity: {},
  clientAddress: "",
  clientPostalCode: "",
  clientPhoneNumber: "",
  clientMobileNumber: "",
  clientEmail: "",
  clientAdditionalInfo: "",
};
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderProducts: (state, action) => {
      state.orderProducts = action.payload;
    },
    setClientName: (state, action) => {
      state.clientName = action.payload;
    },
    setClientLastName: (state, action) => {
      state.clientLastName = action.payload;
    },
    setClientProvince: (state, action) => {
      state.clientProvince = action.payload;
    },
    setClientCity: (state, action) => {
      state.clientCity = action.payload;
    },
    setClientAddress: (state, action) => {
      state.clientAddress = action.payload;
    },
    setClientPostalCode: (state, action) => {
      state.clientPostalCode = action.payload;
    },
    setClientPhoneNumber: (state, action) => {
      state.clientPhoneNumber = action.payload;
    },
    setClientMobileNumber: (state, action) => {
      state.clientMobileNumber = action.payload;
    },
    setClientEmail: (state, action) => {
      state.clientEmail = action.payload;
    },
    setClientAdditionalInfo: (state, action) => {
      state.clientAdditionalInfo = action.payload;
    },
  },
});

export const {
  setOrderProducts,
  setClientName,
  setClientLastName,
  setClientProvince,
  setClientCity,
  setClientAddress,
  setClientPostalCode,
  setClientPhoneNumber,
  setClientMobileNumber,
  setClientEmail,
  setClientAdditionalInfo,
} = orderSlice.actions;
export default orderSlice.reducer;
