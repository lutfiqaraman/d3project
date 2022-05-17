const csvFilePath = "../ch4/data/weekly_temperature.csv";

d3
    .csv(csvFilePath, d => {
        return {
            date: d.date
        }
    }).then(data => {
        console.log(data);
    });
