export enum CellType {
  Text,
  Button,
}

export interface ParamsInterface {
  [key: string]: ParamInterface;
}

export enum ButtonType {
  REMOVE = "remove",
  VIEW_MORE = "view_more",
  SELL = "sell",
}
export interface ParamInterface {
  title: string;
  cellType: CellType;
  titleType: CellType;
  width: string;
  buttonValue?: string;
  textAlign?: "right" | "left";
  buttonColor?: string;
  buttonType?: ButtonType;
}
