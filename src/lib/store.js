import { motionValue } from 'framer-motion';

// 0..1: how much of the screen the lime section covers. The 3D scene turns its points black as it rises.
export const limeAmt = motionValue(0);

// Loader → scene: while `introOn` is 1 the scene ignores the page and shows the loader's shapes, centred.
export const introOn = motionValue(1);
export const introA = motionValue(0);
export const introB = motionValue(0);
export const introMix = motionValue(0);
export const introFill = motionValue(0); // 0..1 lime sweep through the wordmark
export const introScale = motionValue(1);
export const introAlpha = motionValue(1); // the wordmark dissolves to 0 as the page appears
export const textReady = motionValue(0); // set by the scene once the wordmark points exist
