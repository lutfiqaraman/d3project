const csvFilePath = "../ch4/data/weeklyTemperature.csv";

d3
    .csv(csvFilePath, d => {
        return {
            date: d.date
        }
    }).then(data => {
        console.log(data);
    });
