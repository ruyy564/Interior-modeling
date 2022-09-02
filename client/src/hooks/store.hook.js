import create from 'zustand';

export const useStore = create((set) => ({
  target: null,
  setTarget: (target) => set({ target }),
}));
