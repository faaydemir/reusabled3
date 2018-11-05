class LineChart extends ModuleBase {
    constructor(container, config, data) {
        super(container, config, data);

        this._defaultConfig = {
            components: ["bar", "circle", "line", "xAxis", "yAxis", "label"],
        }
        this._init(container, config, data);
    };
}