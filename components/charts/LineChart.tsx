import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { chartConfig } from "./ChartConfig";

export default function LineChartGraph() {
  const config = chartConfig();
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
        ],
      },
    ],
  };
  return (
    <LineChart
      data={data}
      width={Dimensions.get("window").width - 40}
      height={220}
      yAxisLabel="$"
      yAxisSuffix="k"
      yAxisInterval={1}
      chartConfig={config}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 16,
      }}
    />
  );
}
