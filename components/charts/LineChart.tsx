import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { chartConfig } from "./ChartConfig";

type Params = {
  last6monthsStats: {
    date: string;
    foyda: number;
    savdo: number;
  }[];
};

export default function LineChartGraph({ last6monthsStats }: Params) {
  const labels = [];
  const sells = [];

  for (const item of last6monthsStats) {
    labels.push(item.date.split("-")[1]);
    sells.push(item.savdo / 1000000);
  }
  const config = chartConfig();
  const data = {
    labels: labels,
    datasets: [
      {
        data: sells,
      },
    ],
  };
  return (
    <LineChart
      data={data}
      width={Dimensions.get("window").width - 40}
      height={220}
      yAxisSuffix=" Mln"
      yAxisInterval={1}
      chartConfig={config}
      bezier
      yLabelsOffset={10}
      style={{
        marginVertical: 8,
        borderRadius: 8,
      }}
    />
  );
}
