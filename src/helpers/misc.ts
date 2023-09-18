export const noop = () => {};
export type NoopFunction = typeof noop;

export const isBrowser = () => typeof window !== "undefined";

export const isNavigator = () => typeof navigator !== "undefined";
