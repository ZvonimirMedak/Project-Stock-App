import { User } from "../consts/interfaces";

export const SET_USER = "SET_USER";
export const REMOVE_USER = "REMOVE_USER";

type SetUser = {
  readonly type: typeof SET_USER;
  readonly user: User;
};

type RemoveUser = {
  readonly type: typeof REMOVE_USER;
};

export const setUser = (user: User): SetUser => ({
  type: SET_USER,
  user,
});

export const removeUser = (): RemoveUser => ({
  type: REMOVE_USER,
});

export type Auth = SetUser | RemoveUser;
