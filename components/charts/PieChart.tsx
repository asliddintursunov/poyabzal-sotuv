import { PieChart } from "react-native-chart-kit";
import { Dimensions, View, Text } from "react-native";
import { chartConfig } from "./ChartConfig";

export default function PieChartGraph() {
  const config = chartConfig();
  const savdo = 30000000;
  const foyda = 10000000;
  const chiqim = 3000000;
  const soft_foyda = foyda - chiqim;
  const data = [
    {
      name: "Foyda",
      money: foyda,
      color: "#0063ff",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Chiqim",
      money: chiqim,
      color: "#F320DB",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Sof foyda",
      money: soft_foyda,
      color: "#ffa726",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];
  return (
    <View>
      <Text style={{ fontSize: 26 }}>
        {new Intl.NumberFormat("en-US", {
          style: "decimal",
          useGrouping: true,
        }).format(savdo)}{" "}
        savdo
      </Text>
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
