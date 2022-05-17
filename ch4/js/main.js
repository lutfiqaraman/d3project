const csvFilePath = "../ch4/data/weeklyTemperature.csv";

d3
    .csv(csvFilePath, d3.autoType)
    .then(data => {
        console.log(data);
    });
