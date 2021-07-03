// @ts-ignore
import { CanvasJS } from "canvasjs-react-charts";
import { ChartData } from "../containers/SpecificStockContainer";

export const chartOptions = (dataPoints: ChartData[], stockName: string) => {
  return {
    animationEnabled: true,
    theme: "dark2",
    title: {
      text: `Stock Price of ${stockName}`,
    },
    axisX: {
      valueFormatString: "",
      crosshair: {
        enabled: true,
        snapToDataPoint: true,
      },
    },
    axisY: {
      title: "Price (in $)",
      valueFormatString: "€##0.00",
      crosshair: {
        enabled: true,
        snapToDataPoint: true,
        labelFormatter: (e: any) =>
          "$" + CanvasJS.formatNumber(e.value, "##0.00"),
      },
    },
    data: [
      {
        type: "area",
        xValueFormatString: "",
        yValueFormatString: "$##0.00",
        dataPoints: dataPoints,
      },
    ],
  };
};

export const formatChart = (close: number[], timestamp: number[]) => {
  return close.reduce((prev: any, curr: any, index: number) => {
    if (curr !== null) {
      return {
        ...prev,
        [index]: {
          x: new Date(timestamp[index] * 1000),
          y: curr,
        },
      };
    }
    return { ...prev };
  }, {} as ChartData);
};
