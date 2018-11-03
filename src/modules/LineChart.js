class LineChart extends ModuleBase {
    constructor() {
        super();

        this._defaultConfig = {

            components: {
                label: {
                    type: Line,
                    layout: {
                        margin: { top: 0, right: 0, bottom: 0, left: 60 },
                        width: "100%",
                        height: 60,
                        align: ["top"],
                        position: "absolute",
                    }
                },
                mainChart: {
                    type: Line,
                    layout: {
                        margin: { top: 60, right: 0, bottom: 0, left: 60 },
                        width: "%100",
                        height: "100%",
                        align: ["center"],
                        position: "absolute",
                    }
                },
                xAxis: {
                    type: xAxis,
                    layout: {
                        margin: { top: 0, right: 0, bottom: 0, left: 60 },
                        width: "100%",
                        height: 60,
                        align: ["bottom", "right"],
                        position: "absolute",
                    }
                },
                yAxis: {
                    type: yAxis,
                    layout: {
                        margin: { top: 60, right: 0, bottom: 0, left: 0 },
                        width: 60,
                        height: "100%",
                        align: ["left"],
                        position: "absolute",
                    }
                },
            },

        }
    };

}