import { PieChart } from "react-native-chart-kit";
import { Dimensions, View } from "react-native";
import { chartConfig } from "./ChartConfig";

type Params = {
  currMonthStats: {
    foyda: number;
    savdo: number;
  };
};

export default function PieChartGraph({ currMonthStats }: Params) {
  const config = chartConfig();
  const data = [
    {
      name: "Foyda",
      money: currMonthStats.foyda ?? 0,
      color: "#0063ff",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Savdo",
      money: currMonthStats.savdo ?? 0,
      color: "#ffa726",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];
  return (
    <View>
      {/* <Text style={{ fontSize: 26 }}>{savdo} savdo</Text> */}
      <PieChart
        data={data}
        width={Dimensions.get("window").width - 10}
        height={220}
        chartConfig={config}
        accessor={"money"}
        backgroundColor={"transparent"}
        paddingLeft={"0"}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
        center={[0, 0]}
        absolute
      />
    </View>
  );
}
