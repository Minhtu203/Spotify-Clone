import { create } from 'zustand';

const useSongState = create((set, get) => ({
    toggleUpdate: false,

    setUpdate: () => {
        const update = get().toggleUpdate;
        set({ toggleUpdate: !update });
    },
}));

const getSongState = () => useSongState.getState();
export { useSongState, getSongState };
