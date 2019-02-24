import ChartBase from "./chart-base";

export default class Chart extends ChartBase {
    constructor(container, data, config) {
        super(container, data, config);

        this._defaultConfig = {
            components: ["tooltip", "label", "area",
                "bar", "circle", "dataLabel", "xAxis",
                "yAxis", "dataFocus", "event", "line", /*"brush",*/
            ],
        };

    }
}