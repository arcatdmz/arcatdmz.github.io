import buildInfo from "./generated/build-info.json";

/** Static pages must hydrate against the build clock, even months after export. */
export const buildTimestamp = Date.parse(buildInfo.timestamp);
export const buildYear = buildInfo.year;
