import { createContext, useContext } from 'react';

// false while the homepage loader runs; sections wait for it before playing their entrance.
export const ReadyContext = createContext(true);
export const useReady = () => useContext(ReadyContext);
