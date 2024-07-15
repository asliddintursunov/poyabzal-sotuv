export const chartConfig = () => {
    const config = {
      backgroundColor: "royalblue",
      backgroundGradientFrom: "royalblue",
      backgroundGradientTo: "royalblue",
      decimalPlaces: 2,
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 8,
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "royalblue",
      },
    };
    return config
}