class ModuleBase {
    constructor(container, config, data) {
        this.containers = {};
        this.baseConfig = {
            components: ["bar", "circle", "line", "xAxis", "yAxis", "label"],
            component: {
                label: {
                    type: Label,
                    layout: {
                        width: "100%",
                        height: 40,
                        position: "absolute",
                        r: 0,
                        c: 1,
                    }
                },
                line: {
                    type: Line,
                    layout: {
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        r: 1,
                        c: 1,
                    }
                },
                bar: {
                    type: Line,
                    layout: {
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        r: 1,
                        c: 1,
                    }
                },
                circle: {
                    type: Line,
                    layout: {
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        r: 1,
                        c: 1,
                    }
                },
                xAxis: {
                    type: xAxis,
                    layout: {
                        width: "100%",
                        height: 40,
                        position: "absolute",
                        r: 2,
                        c: 1,
                    }
                },
                yAxis: {
                    type: yAxis,
                    layout: {
                        width: 40,
                        height: "100%",
                        r: 1,
                        c: 0,
                    }
                },
            },

        };
    }
    _init(container, data, config) {
        this.config = MergeTo(this.baseConfig, MergeTo(this._defaultConfig, config));
        this._initContainer(container);
        this._initLayout();
        this._initScales();
        this.data = clone(data);
    }

    _initLayout() {
        let colorMap = d3.scaleOrdinal(d3.schemeCategory10);
        this.grid = new AutoGrid(this.container);
        let calculatedLayout = {};
        for (let component in this.config.component) {
            if (!(this.config.component[component])) continue;
            let cLayout = this.config.component[component].layout
            this.grid.AddItem(cLayout.c, cLayout.r, cLayout.width, cLayout.height);
        }

        this.grid.Update();

        for (let component in this.config.component) {
            if (!this.config.component[component]) continue;
            let cLayout = this.config.component[component].layout;

            let ly = this.grid.GetLayout(cLayout.c, cLayout.r, cLayout.width, cLayout.height);
            this.containers[component] = this.container.append("g").attr("width", ly.width).attr("height", ly.height).attr("transform", ly.translate).append("rect").attr("width", ly.width).attr("height", ly.height).style("fill", colorMap(component));
        }


    }
    _initScales() {

    }
    _initContainer(container) {
        if (typeof container === "string") { // if #divId , or  .divclass 
            this.container = d3.select(container).append("svg")
                .attr("width", "100%").attr("height", "100%");
        } else { // else  assume container is appended g or svg
            this.container = container;
        }
    }
}