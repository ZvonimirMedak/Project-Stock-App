import { colors } from "../colors";
import { ButtonType, CellType, ParamsInterface } from "./params";

export const purchasedParams: ParamsInterface = {
  name: {
    titleType: CellType.Text,
    title: "Naziv dionice",
    cellType: CellType.Text,
    width: "20vw",
  },

  price: {
    titleType: CellType.Text,
    title: "Uloženo $",
    cellType: CellType.Text,
    width: "15vw",
    textAlign: "left",
  },
  sell: {
    titleType: CellType.Text,
    title: "",
    cellType: CellType.Button,
    width: "18vw",
    buttonValue: "Prodaj",
    textAlign: "right",
    buttonColor: colors.success,
    buttonType: ButtonType.SELL,
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
