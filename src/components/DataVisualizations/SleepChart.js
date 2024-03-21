import { VictoryChart, VictoryLine, VictoryAxis, VictoryLabel, VictoryTheme, VictoryVoronoiContainer} from "victory-native";

export function SleepGraph(sleepLog) {
  // props -> sleepLog
  // sleepData = sleepLog.levels.data -> [...]
  // minutesAsleep = sleepLog.minutesAsleep
  const sleepData = [
  {
    "dateTime": "2020-02-20T23:00:00.000",
    "level": "wake",
    "seconds": 600
  },
  {
    "dateTime": "2020-02-20T23:10:00.000",
    "level": "light",
    "seconds": 1200
  },
  {
    "dateTime": "2020-02-20T23:30:00.000",
    "level": "deep",
    "seconds": 2400
  },
  {
    "dateTime": "2020-02-21T00:30:00.000",
    "level": "REM",
    "seconds": 1800
  },
  {
    "dateTime": "2020-02-21T01:00:00.000",
    "level": "light",
    "seconds": 1200
  },
  {
    "dateTime": "2020-02-21T01:20:00.000",
    "level": "wake",
    "seconds": 600
  },
  {
    "dateTime": "2020-02-21T01:30:00.000",
    "level": "light",
    "seconds": 1800
  },
  {
    "dateTime": "2020-02-21T02:00:00.000",
    "level": "deep",
    "seconds": 3600
  }
];

const convertDateTime = (dateTimeObj) => {
  const dateTime = new Date(dateTimeObj);
  let hour = dateTime.getHours();
  const minute = dateTime.getMinutes().toString().padStart(2, '0'); // Ensure two digits for minutes
  const period = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12 || 12; // Convert hour to 12-hour notation
  return hour + ":" + minute + " " + period;
}

const graphingSleepData = sleepData.reduce((acc, entry, index, array) => {
  let convertedSleepLevel = 4;
  switch(entry.level) {
    case "light":
      convertedSleepLevel = 3;
      break;
    case "REM":
      convertedSleepLevel = 2;
      break;
    case "deep":
      convertedSleepLevel = 1;
      break;
  }

  let x = convertDateTime(entry.dateTime)
  let y = convertedSleepLevel;
  let rawTime = new Date(entry.dateTime)

  acc.push({x: x, y: y, rawTime: rawTime})

  if (index < array.length - 1) {
    x = convertDateTime(array[index + 1].dateTime);
    rawTime = array[index + 1].dateTime;
    acc.push({x : x, y: y, rawTime: rawTime})
  }

  if (index === array.length - 1) {
    let endTime = new Date(new Date(entry.dateTime).getTime() + entry.seconds * 1000)
    x = convertDateTime(endTime)
    acc.push({x : x, y: y, rawTime: rawTime})
  }

  return acc;
}, [])

// Get the duration between each sleep stage and add it to our sleep data
for (let i = 0; i < graphingSleepData.length - 1; i += 2) {
  const duration = Math.abs(new Date(graphingSleepData[i + 1].rawTime) - new Date(graphingSleepData[i].rawTime)) / (1000 * 60)
  graphingSleepData[i].duration = duration
  graphingSleepData[i + 1].duration = duration

  graphingSleepData[i].range = graphingSleepData[i].x + " - " + graphingSleepData[i + 1].x
  graphingSleepData[i + 1].range = graphingSleepData[i].x + " - " + graphingSleepData[i + 1].x
}

// Get total minutes and the date range of the sleeping data
const getGraphInformation = sleepData.reduce((acc, entry) => {
  // totalMinutesAsleep converted to actual time
  // dateOfSleep (month, day, year)
  const dateTime = new Date(entry.dateTime);
  const year = dateTime.getFullYear();
  const month = dateTime.getMonth() + 1; // Month is zero-based, so we add 1
  const day = dateTime.getDate();
  acc.push({"hours": 3, "minutes": 30, "seconds": 30, "year": year, "month": month, "day": day})
  return acc;
}, [])

// Label our x-axis with times according to the sleeping data
const xGraphLabels = sleepData.reduce((acc, entry, index, array) => {
  const dateTime = new Date(entry.dateTime);

  // Add time before the first index
  if (index === 0) {
    const beforeTime = new Date(dateTime.getTime() - 15 * 60000); // Subtract 30 minutes
    acc.push(convertDateTime(beforeTime));
  }

  acc.push(convertDateTime(dateTime))

  if (index === array.length - 1) {
    const endTime = new Date(new Date(entry.dateTime).getTime() + entry.seconds * 1000)
    acc.push(convertDateTime(endTime));
  }

  return acc;
}, []);

const sleepLevels = {
  1: "Deep",
  2: "REM",
  3: "Light",
  4: "Awake"
}

// Get all the dates the person slept
const dates = getGraphInformation.reduce((acc, entry) => {
    if (!acc.includes(entry.month + "/" + entry.day + "/" + entry.year)) {
        acc.push(entry.month + "/" + entry.day + "/" + entry.year)
    }
    return acc;
}, [])
dates.splice(1, dates.length - 2); // Ensure that only the first and last dates are in there

  return (
  <VictoryChart theme={VictoryTheme.material} padding={{ top: 75, bottom: 75, left: 60, right: 60 }}
    containerComponent={
      <VictoryVoronoiContainer 
        labels={ ({datum}) => datum.range + "\n" + (sleepLevels[datum.y] !== "Awake" ? sleepLevels[datum.y] + " Sleep" : "Awake") 
        + "\n" + datum.duration + " minutes"}
        voronoiPadding={10}
      />
    }
  >
    <VictoryLabel
        text={"Sleep Graph: " + dates.join(" - ")}
        x={200} 
        y={20}
        textAnchor="middle"
        style={{ fontSize: 20, fill: 'black', fontWeight: "b"}}
    />
    <VictoryLabel
        text={"Time Asleep: " + getGraphInformation[0].hours + " hr " + getGraphInformation[0].minutes + " min"}
        x={200} 
        y={50}
        textAnchor="middle"
        style={{ fontSize: 20, fill: 'black' }}
    />
    <VictoryAxis
      tickValues={xGraphLabels.filter((_, index) => index % 2 === 1)} // Display ticks at every other data point
      tickFormat={(value) => {
        const [hour, minute] = value.split(':'); // Split the time into hour and minute
        return `${hour}:${minute}`; // Display only hour and minute
      }}
      style={{
        grid : {
          strokeWidth: 2,
          strokeDasharray: "none"
        },
        tickLabels: { 
          fontWeight: "bold",
          fontSize: 12 
        },
      }}
      scale={{ x: 'time' }}
    />
    <VictoryAxis
      dependentAxis
      tickValues={[0.5, 1, 2, 3, 4, 4.5]}
      tickFormat={["", "Deep", "REM", "Light", "Awake", ""]}
      style={{
        grid: {
          stroke: d => {
            if (d.tickValue === 1) {
              return "#333A73"
            }
            else if (d.tickValue === 2) {
              return "#387ADF"
            }
            else if (d.tickValue === 3) {
              return "#50C4ED"
            }  
            else if (d.tickValue === 4) {
              return "#FBA834"
            }          
          },
          strokeWidth: 3,
          strokeDasharray: [] // Make grid lines solid
        },
        tickLabels: {
          fontWeight: 'bold',
          fontSize: 14
        }
      }}
    />

    <VictoryLine 
      categories={{x: xGraphLabels}}
      data={graphingSleepData}
      style={{
        data: { stroke: "#10526A", strokeWidth: 5}
      }}
    /> 
  </VictoryChart>
  );
}