import t from "./translations.json";

const keys = Object.keys(t.hr.translation);
const values = Object.values(t.hr.translation);
// @ts-ignore
export const translations: typeof t.hr.translation = keys.reduce(
  (acc, curr, index) => {
    return { ...acc, [curr]: values[index] };
  },
  {}
);
