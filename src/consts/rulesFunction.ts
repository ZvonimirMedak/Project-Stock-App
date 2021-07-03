import { translations } from "../i18n/translation";
import { rules, RulesInterface } from "./rules";
export const MIN_PASSWORD_LENGTH = 5;
export const MAX_PASSWORD_LENGTH = 100;
export const MIN_FIELD_LENGTH = 2;
export const MAX_FIELD_LENGTH = 100;
export const OIB_LENGTH = 11;

export interface LoginAndCreateData {
  rules: (t: (value: string) => string) => {
    email: Partial<RulesInterface> | undefined;
    password: Partial<RulesInterface> | undefined;
  };
}

export const loginAndCreateRules: LoginAndCreateData = {
  rules: (t: (value: string) => string) => ({
    email: {
      required: (rules(t).required = {
        value: true,
        message: t(translations.email_required_message),
      }),
      pattern: (rules(t).emailPattern = {
        value: rules(t).emailPattern.value,
        message: t(translations.email_pattern_invalid),
      }),
    },
    password: {
      required: (rules(t).required = {
        value: true,
        message: t(translations.password_required_message),
      }),
      minLength: rules(t).minLength(
        MIN_PASSWORD_LENGTH,
        t(translations.password_min_length_invalid)
      ),
      maxLength: rules(t).maxLength(
        MAX_PASSWORD_LENGTH,
        t(translations.password_max_length_invalid)
      ),
    },
  }),
};
