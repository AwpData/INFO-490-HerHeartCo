import { View, Text } from "react-native";
import { LineChart, ProgressChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { Iconify } from "react-native-iconify";

export function SleepGraph() {

  const sleep_data = () => {
    let data = [3, 3, 3, 3, 3]
    let prevNumber = Math.floor(Math.random() * 4); // Generate random number between 1 and 4 for the first element

    for (let i = 0; i < 20; i++) {
      const min = Math.max(prevNumber - 1, 0); // Set the minimum value based on the previous number
      const max = Math.min(prevNumber + 1, 3); // Set the maximum value based on the previous number
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min; // Generate random number between min and max
      for (let j = 0; j < 10; j++) {
        data.push(randomNumber);
      }
      prevNumber = randomNumber; // Update the previous number for the next iteration
    }
    data.push(3)
    return data;
  }

  let sleep_data_arr = sleep_data();

  return (
  <View>
    <Text style={{fontSize: 20, color: "#10526", fontWeight: "bold"}}>Time Asleep</Text>
    <LineChart
      data={{
        labels: ["12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM"],
        datasets: [
          {
            data: sleep_data_arr,
            color: () => "white",
          }
        ]
      }}

      width={Dimensions.get("window").width} // from react-native
      height={300}
      segments={3}
      fromZero = {true}
      yAxisInterval={10} // optional, defaults to 1
      withVerticalLines = {false}
      chartConfig={{
        backgroundGradientFromOpacity: "0",
        backgroundGradientToOpacity: "0",
        decimalPlaces: 0, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0,${opacity})`,
        propsForDots: {
          r: "3",
        },
      }}
      bezier
      formatYLabel={(label) => {
        switch(label) {
          case "0":
            return "Deep";
          case "1":
            return "Core";
          case "2":
            return "REM";
          case "3":
            return "Awake";
        }
      }}
      getDotColor={(dataPoint) => {
        switch(dataPoint) {
          case 0:
            return "blue";
          case 1:
            return "purple";
          case 2:
            return "orange";
          case 3:
            return "red";
        }
      }}
    />
  </View>
  )
}