function CreateData(count, start) {
    let data = [];
    start = start || 0;
    for (let index = 0; index < count; index++) {
        data.push({
            x: index + start,
            y: Math.random() * 100
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
    maxDataCount: 73
}
let lineChartConfig = {
    maxDataCount: 100,
}
let chartModuleConfig = {
    component: ["bar", "circle", "line", "xAxis", "yAxis", "label"],
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

let label = new Label("#label", Object.keys(data), {});
let line = new Line("#line", data, config);
let XAxis = new xAxis("#xaxis", data, config);
let YAxis = new yAxis("#yaxis", data, config);
let bar = new Bar("#bar", data, config);
let circle = new Circle("#circle", data, config);

let lineChart = new LineChart("#linechart", data, lineChartConfig);

AddData(line, 100, 1, 10000);
AddData(bar, 100, 1, 10000);
AddData(YAxis, 100, 1, 10000);
AddData(XAxis, 100, 1, 10000);
AddData(circle, 100, 1, 10000);