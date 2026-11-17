import { motionValue } from 'framer-motion';

// 0..1: how much of the screen the lime section covers. The 3D scene turns its points black as it rises.
export const limeAmt = motionValue(0);

// Loader → scene: while `introOn` is 1 the scene ignores the page and shows the loader's shapes, small and centred.
export const introOn = motionValue(1);
export const introA = motionValue(0);
export const introB = motionValue(0);
export const introMix = motionValue(0);
export const introFill = motionValue(0); // 0..1 lime sweep through the wordmark
export const introX = motionValue(0);
export const introY = motionValue(0);
export const introScale = motionValue(1);
export const textReady = motionValue(0); // set by the scene once the wordmark points exist
