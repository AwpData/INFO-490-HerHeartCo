import { VictoryChart, VictoryLine, VictoryAxis, VictoryLabel, VictoryTooltip, VictoryScatter, VictoryTheme, VictoryVoronoiContainer} from "victory-native";

// props = intradayHRVData

export function HRVGraph(intradayHRVData) {

    const intradayHRVData = {
        "hrv": [
            {
            "minutes": [
                {
                "minute": "2021-10-25T09:10:00.000",
                "value": {
                    "rmssd": 26.617,
                    "coverage": 0.935,
                    "hf": 126.514,
                    "lf": 471.897
                }
                },
                {
                "minute": "2021-10-25T09:15:00.000",
                "value": {
                    "rmssd": 34.845,
                    "coverage": 0.988,
                    "hf": 344.342,
                    "lf": 1422.947
                }
                },
                {
                "minute": "2021-10-25T09:20:00.000",
                "value": {
                    "rmssd": 36.893,
                    "coverage": 0.981,
                    "hf": 328.704,
                    "lf": 298.071
                }
                },
                {
                "minute": "2021-10-25T09:25:00.000",
                "value": {
                    "rmssd": 65.946,
                    "coverage": 0.972,
                    "hf": 1088.794,
                    "lf": 979.685
                }
                }
            ],
        "dateTime": "2021-10-25"
        }
        ]
    }

    const convertDateTime = (dateTimeObj) => {
        const dateTime = new Date(dateTimeObj);
        let hour = dateTime.getHours();
        const minute = dateTime.getMinutes().toString().padStart(2, '0'); // Ensure two digits for minutes
        const period = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12; // Convert hour to 12-hour notation
        return hour + ":" + minute + " " + period;
    }

    const intradayHRVGraphingData = intradayHRVData.hrv[0].minutes.reduce((acc, value) => {
        let date = convertDateTime(new Date(value.minute))
        let hrv = value.value.rmssd;
        acc.push({"x": date, "y": hrv})
        return acc;
    }, [])
    
    let date = intradayHRVData.hrv[0].dateTime.substring(5, 7) + "/" + intradayHRVData.hrv[0].dateTime.substring(8, 10) + "/" + intradayHRVData.hrv[0].dateTime.substring(0, 4);

    return (

    <VictoryChart 
        theme={VictoryTheme.material} padding={{ top: 75, bottom: 75, left: 60, right: 60 }}
        containerComponent={<VictoryVoronoiContainer />}>

    <VictoryLabel
        text={"HRV Variability Graph"}
        x={200} 
        y={20}
        textAnchor="middle"
        style={{ fontSize: 20, fill: 'black', fontWeight: "b"}}
    />
    <VictoryLabel
        text={date}
        x={200} 
        y={50}
        textAnchor="middle"
        style={{ fontSize: 20, fill: 'black' }}
    />
        <VictoryAxis
          dependentAxis
          tickValues={[0, 50, 100, 150]}
          style={{
            axis: { stroke: "#E84E4E" }, // Change the color of the axis line
            ticks: { stroke: "#E84E4E" }, // Change the color of the ticks
            grid: {
                strokeDasharray: "none"
            }
          }}
        />
        <VictoryAxis
            tickFormat={intradayHRVGraphingData.map(item => item.x)}
            style={{
                axis: { stroke: "#E84E4E" }, // Change the color of the axis line
                ticks: { stroke: "#E84E4E" }, // Change the color of the ticks
                grid: {
                    strokeDasharray: "none"
                } 
            }}>
        </VictoryAxis>
        <VictoryLine
            data={intradayHRVGraphingData}
            style={{
                data: { stroke: "#E84E4E", strokeWidth: 3}
            }}>
        </VictoryLine>
        <VictoryScatter
          data={intradayHRVGraphingData}
          labels={({ datum }) => `${datum.y} ms\n${datum.x}`}
          labelComponent={<VictoryTooltip renderInPortal={false} />}
          size={5}
          style={{ data: { fill: "white", stroke: "#B01717", strokeWidth: 3 } }}
        />
    </VictoryChart>
    )
}