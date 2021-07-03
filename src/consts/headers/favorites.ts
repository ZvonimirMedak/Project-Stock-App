import { colors } from "../colors";
import { ButtonType, CellType, ParamsInterface } from "./params";

export const favoritesParams: ParamsInterface = {
  name: {
    titleType: CellType.Text,
    title: "Naziv dionice",
    cellType: CellType.Text,
    width: "24vw",
  },
  delete: {
    titleType: CellType.Text,
    title: "",
    cellType: CellType.Button,
    width: "18vw",
    buttonValue: "Ukloni",
    textAlign: "right",
    buttonColor: colors.fireBrick,
    buttonType: ButtonType.REMOVE,
  },
  viewMore: {
    titleType: CellType.Text,
    title: "",
    cellType: CellType.Button,
    width: "18vw",
    buttonValue: "Vidi više",
    textAlign: "right",
    buttonType: ButtonType.VIEW_MORE,
  },
};
