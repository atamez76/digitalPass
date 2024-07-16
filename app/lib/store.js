import { create } from "zustand";
import { vars } from "./vars";

export const useMenuSelectedStore = create((set) => ({
  menu_selected: "",
  selectUser: () => set({ menu_selected: "user" }),
  selectAccount: () => set({ menu_selected: "account" }),
  clearMenuSelected: () => set({ menu_selected: "" }),
}));

export const useTemplateColor = create((set) => ({
  templateColor: null,
  setNewTemplateColor: (newTemplateColor) =>
    set({ templateColor: newTemplateColor }),
}));

export const useFontColor = create((set) => ({
  FontColor: null,
  setNewFontColor: (newFontColor) => set({ FontColor: newFontColor }),
}));

export const useImageFilters = create((set) => ({
  Opacity: 1,
  GrayScale: 0,
  setNewOpacity: (newOpacity) => set({ Opacity: newOpacity }),
  setNewGrayScale: (newGrayScale) => set({ GrayScale: newGrayScale }),
}));

export const useSelectedFont = create((set) => ({
  selectedFont: null,
  setNewSelectedFont: (newSelectedFont) =>
    set({ selectedFont: newSelectedFont }),
}));

export const useFontSize = create((set) => ({
  fontSize: null,
  setNewFontSize: (newFontSize) => set({ fontSize: newFontSize }),
  clearFontsize: () => set({ fontSize: null }),
}));

export const useFormDataStore = create((set) => ({
  title: null,
  host: null,
  description: null,
  subTitle: null,
  typeOfEvent: null,
  date: null,
  time: null,
  venue: null,
  address: null,
  latLng: null,
  setNewTitle: (newTitle) => set({ title: newTitle }),
  setNewHost:(newHost) => set({host: newHost}),
  setNewDescription: (newDescription) => set({ description: newDescription }),
  setNewSubTitle: (newSubTitle) => set({ subTitle: newSubTitle }),
  setNewTypeOfEvent: (newTypeOfEvent) => set({ typeOfEvent: newTypeOfEvent}),
  setNewDate: (newDate) => set({ date: newDate }),
  setNewTime: (newTime) => set({ time: newTime }),
  setNewVenue: (NewVenue) => set({ venue: NewVenue }),
  setNewAddress: (newAddress) => set({ address: newAddress }),
  setNewLatLng: (newLatLng) => set({ latLng: newLatLng }),
}));

export const useImage = create((set) => ({
  isSelectingImage: false,
  img: null,
  setIsSelectingImage: (newState) => set({isSelectingImage:newState}) ,
  setNewImg: (newImg) => set({ img: newImg }),
}));

export const useConfirmation = create((set) => ({
  confirmation: {},
  setConfirmation: (data) => set({ confirmation: data }),
  clearConfirmation: () => set({ confirmation: {} }),
}));

export const UseMessage = create((set) => ({
  message: null,
  setMessage: (newMessage) => set({ message: newMessage }),
  clearMessage: () => set({ message: null }),
}));