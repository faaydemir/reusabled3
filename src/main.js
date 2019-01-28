function CreateData(count, start) {
    let data = [];
    start = start || 0;
    for (let index = 0; index < count; index++) {
        data.push({
            x: index + start,
            y: Math.random() * 10,
            z: Math.random() * 100,
            q: Math.random() * 1000
        });
    }
    return data;
}
async function AddData(chart, sleepTime, dataCount, addCount) {
    for (let index = 1; index < addCount; index++) {
        await sleep(sleepTime);
        chart.AppendData({
            set1: CreateData(dataCount, (index - 1) * dataCount),
            set2: CreateData(dataCount, (index - 1) * dataCount),
            set3: CreateData(dataCount, (index - 1) * dataCount),
        });
    }
}

let config = {
    maxDataCount: 101
}
let lineChartConfig = {
    maxDataCount: 101,
}
let chartModuleConfig = {
    components: {
        bar: {
            config: {
                y: d => d.y
            }
        }
    }
}


let data = {
    set1: [],
    set2: [],
    set3: []
}

let label = new Label("#label", data, {});
let line = new Line("#line", data, config);
let XAxis = new xAxis("#xaxis", data, config);
let YAxis = new yAxis("#yaxis", data, config);
let bar = new Bar("#bar", data, config);
let circle = new Circle("#circle", data, config);

let lineChart = new Chart("#linechart", data, lineChartConfig);

label.Draw();
line.Draw();
XAxis.Draw();
YAxis.Draw();
bar.Draw();
circle.Draw();

//lineChart.Draw();

AddData(line, 100, 1, 10000);
AddData(bar, 100, 1, 10000);
AddData(YAxis, 100, 1, 10000);
AddData(XAxis, 100, 1, 10000);
AddData(circle, 100, 1, 10000);

//AddData(lineChart, 100, 1, 10000);