import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import { ParamsInterface } from "../consts/headers/params";
import ReactList from "react-list";
import CellRow from "./CellRow";
import { AllStocks, FavoriteStock, PurchasedStock } from "../consts/interfaces";
import CustomCell from "./CustomCell";
import { colors } from "../consts/colors";
interface Props {
  data: PurchasedStock[] | AllStocks[] | FavoriteStock[];
  tableParams: ParamsInterface;
  openSellModal?: (stock: PurchasedStock) => void;
  removeStock?: (uuid: string) => void;
  handleButtonPress: (item: AllStocks) => void;
}

const CustomTable = (props: Props) => {
  const { tableParams, data, handleButtonPress, removeStock, openSellModal } =
    props;
  const keys = React.useMemo(() => Object.keys(tableParams), [tableParams]);
  const classes = useClasses();

  const header = React.useMemo(() => {
    return (
      <Box className={classes.rowDirection}>
        {keys.map((key, index) => {
          return (
            <CustomCell
              key={index}
              width={`${parseInt(tableParams[key].width) + 0.05}vw`}
              cellType={tableParams[key].titleType}
              textAlign={tableParams[key].textAlign}
              val={tableParams[key].title}
            />
          );
        })}
      </Box>
    );
  }, [tableParams, classes, keys]);

  return (
    <Box className={classes.mainContainer}>
      <Box className={classes.fixed}>
        {header}
        <ReactList
          length={data.length}
          type="uniform"
          pageSize={20}
          itemsRenderer={(items: any, refs: any) => (
            <div ref={refs}>{items}</div>
          )}
          itemRenderer={(index: number) => (
            <CellRow
              key={`Cell-${index}-${data[index].symbol}`}
              index={index}
              data={data}
              tableParams={tableParams}
              keys={keys}
              openSellModal={openSellModal}
              removeStock={removeStock}
              handleButtonPress={handleButtonPress}
            />
          )}
        />
      </Box>
    </Box>
  );
};

const useClasses = makeStyles({
  mainContainer: {
    overflow: "auto",
    tableLayout: "fixed",
    borderCollapse: "separate",
    maxHeight: "66vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    marginTop: 100,
  },
  fixed: {
    tableLayout: "fixed",
    borderCollapse: "separate",
    height: "100%",
    display: "flex",
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  rowDirection: {
    display: "flex",
    fontSize: 20,
    fontWeight: "bold",
    borderBottom: `2px solid ${colors.white}`,
    position: "sticky",
    left: 0,
    zIndex: 20,
    top: "0px",
    backgroundColor: colors.bgColor,
    "@media (max-width: 900px)": {
      width: "80vw",
    },
  },
});

export default CustomTable;
