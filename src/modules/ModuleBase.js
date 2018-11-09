class ModuleBase {
    constructor(container, data, config) {
        this.containers = {};
        this.baseConfig = {
            components: ["bar", "circle", "line", "xAxis", "yAxis", "label", "tooltip"],
            width: "100%",
            height: "100%",

        };
        this.componentConfig = {
            tooltip: {
                type: Tooltip,
            },
            label: {
                type: Label,
                config: {
                    width: "100%",
                    height: 20,
                    row: 0,
                    column: 1,
                }
            },
            line: {
                type: Line,
                config: {
                    width: "100%",
                    height: "100%",
                    row: 1,
                    column: 1,
                }
            },
            bar: {
                type: Bar,
                config: {
                    width: "100%",
                    height: "100%",
                    row: 1,
                    column: 1,
                }
            },
            circle: {
                type: Circle,
                config: {
                    width: "100%",
                    height: "100%",
                    row: 1,
                    column: 1,
                }
            },
            xAxis: {
                type: xAxis,
                config: {
                    width: "100%",
                    height: 20,
                    row: 2,
                    column: 1,
                }
            },
            yAxis: {
                type: yAxis,
                config: {
                    width: 30,
                    height: "100%",
                    row: 1,
                    column: 0,
                }
            },
        }
    }
    _init(container, data, config) {
        this.config = MergeTo(this.baseConfig, MergeTo(this._defaultConfig, config));
        this.data = clone(data);
        this.eventBus = new EventBus();
        this._initContainer(container);
        this._initLayout();
        this._initComponents();

    }

    _initLayout() {
        let colorMap = d3.scaleOrdinal(d3.schemeCategory10);
        this.grid = new AutoGrid(this.container);
        let calculatedLayout = {};
        this.config.components.forEach(
            component => {
                if ((this.componentConfig[component]) &&(this.componentConfig[component].config) ) {
                    let cLayout = this.componentConfig[component].config
                    this.grid.AddItem(cLayout.column, cLayout.row, cLayout.width, cLayout.height);
                }
            });

        this.grid.Update();

        this.config.components.forEach(
            component => {
                if ((this.componentConfig[component]) &&(this.componentConfig[component].config) )  {
                    let cLayout = this.componentConfig[component].config;

                    let ly = this.grid.GetLayout(cLayout.column, cLayout.row, cLayout.width, cLayout.height);
                    this.containers[component] = this.container.append("g").attr("width", ly.width).attr("height", ly.height).attr("transform", ly.translate);

                    // for debug 
                    // delete later
                    this.containers[component].append("rect").attr("width", ly.width).attr("height", ly.height).attr("opacity", 0.1).style("fill", colorMap(component))
                }
            });


    }
    _initComponents() {
        this.components = {}
        this.config.components.forEach(
            component => {
                if ((this.componentConfig[component])) {
                    let container = this.containers[component];
                    let config = MergeTo(this.componentConfig[component].config, this.config);
                    let data = this.data;
                    this.components[component] = new this.componentConfig[component].type(container, data, config);
                    this.components[component].eventBus(this.eventBus)
                }
            });
    }

    AppendData(data) {

        this.config.components.forEach(
            component => {
                if (this.components[component].AppendData)
                    this.components[component].AppendData(data);
            });
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