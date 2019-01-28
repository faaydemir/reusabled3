class Chart extends ModuleBase {
    constructor(container, data, config) {
        super(container, data, config);

        this._defaultConfig = {
            components: ["bar", "circle", "line", "xAxis", "yAxis", "label", "tooltip", "dataLabel"],
        }
        this._init(container, data, config);
    };
}