// TODO change here to change all components from single file later
import Label from './red3/components/label';
import Line from './red3/components/line';
import Bar from './red3/components/bar';
import Circle from './red3/components/circle';
import yAxis from './red3/components/yAxis';
import xAxis from './red3/components/xAxis';
import Area from './red3/components/area';
import dataLabel, { DataLabel } from './red3/components/data-label';

import * as utils from './red3/utils';

async function draw() {

    async function AddData(chart, sleepTime, dataCount, addCount) {
        for (let index = 1; index < addCount; index++) {
            await utils.sleep(sleepTime);
            chart.AppendData({
                set1: CreateData(dataCount, (index - 1) * dataCount),
                set2: CreateData(dataCount, (index - 1) * dataCount),
                set3: CreateData(dataCount, (index - 1) * dataCount),
            });
        }

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
    }

    let config = {
        maxDataCount: 101
    }

    let data = {
        set1: [],
        set2: [],
        set3: []
    }
    let line = new Line("#line", data, config);
    let label = new Label("#label", data, {});
    let XAxis = new xAxis("#xaxis", data, config);
    let YAxis = new yAxis("#yaxis", data, config);
    let area = new Area("#area", data, config);
    let bar = new Bar("#bar", data, config);
    let circle = new Circle("#circle", data, config);
    let dataLabel = new DataLabel("#data-label", data, config);

    line.Draw();
    label.Draw();
    XAxis.Draw();
    YAxis.Draw();
    bar.Draw();
    circle.Draw();
    dataLabel.Draw();
    area.Draw();

    AddData(area, 100, 1, 10000);
    AddData(line, 100, 1, 10000);
    AddData(bar, 100, 1, 10000);
    AddData(YAxis, 100, 1, 10000);
    AddData(XAxis, 100, 1, 10000);
    AddData(circle, 100, 1, 10000);
    AddData(XAxis, 100, 1, 10000);
    AddData(dataLabel, 100, 1, 10000);

}
draw();