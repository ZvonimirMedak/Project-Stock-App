import { ButtonType, CellType, ParamsInterface } from "./params";

export const mostTradedParams: ParamsInterface = {
  name: {
    titleType: CellType.Text,
    title: "Naziv dionice",
    cellType: CellType.Text,
    width: "24vw",
  },
  viewMore: {
    titleType: CellType.Text,
    title: "",
    cellType: CellType.Button,
    width: "24vw",
    buttonValue: "Vidi više",
    textAlign: "right",
    buttonType: ButtonType.VIEW_MORE,
  },
};
