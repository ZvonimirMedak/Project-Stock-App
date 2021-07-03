import React from "react";
import { ValidationRule, ValidationValueMessage } from "react-hook-form";

export function rules(t: (value: string) => string) {
  return {
    required: {
      value: true,
      message: t("field_required"),
    },
    numberPattern: {
      value: /^[0-9]+$/,
      message: t("pin_validation"),
    },
    minLength: (value: number, message?: string) => ({
      value,
      message: message ? t(message) : `${t(`min_length`)} ${value}`,
    }),
    maxLength: (value: number, message?: string) => ({
      value,
      message: message ? t(message) : `${t(`max_length`)} ${value}`,
    }),
    emailPattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: t("email_pattern_not_valid"),
    },
    phoneNumberPattern: {
      value: /([0-9])|([+])|\s|([(-)])|([-])/,
      message: t(""),
    },
    numberPatternBelow999: {
      value: /^[^0]([0-9]){0,2}$/,
      message: t("number_pattern_not_valid"),
    },
    numberPatternAny: {
      value: /^[^0]([0-9])+$/,
      message: t("number_valitdation"),
    },
    notEmptyPattern: {
      // eslint-disable-next-line no-useless-escape
      value: /^[^\s|^\- |^\.].*/,
      message: t("not_empty"),
    },
    usernamePattern: {
      value: /[a-zA-Z]+/,
      message: t("only_words"),
    },
  };
}

export interface RulesInterface {
  required: string | boolean | ValidationValueMessage<boolean>;
  min: ValidationRule<React.ReactText>;
  max: ValidationRule<React.ReactText>;
  maxLength: ValidationRule<React.ReactText>;
  minLength: ValidationRule<React.ReactText>;
  pattern: ValidationRule<RegExp>;
}
