class xAxis extends d3Base {
    constructor(container, data, config) {
        super();
        this._defaultConfig = {
            tickCount: 10,
            width: "100%",
            height: 50,
            maxDataCount: null,
            scaleX: null,
            x: d => d.x,
            domainX: null,
            format: d => d,
        };

        this._init(container, data, config);
        this._initScales();
        this._draw();

    }
    _draw() {

        this.xAxis = d3.axisBottom()
            .scale(this.scaleX)
            .ticks(this.config.tickCount)
            .tickFormat(this.config.format)
            .tickSizeOuter(5)
            .tickPadding(5)
            .tickSizeInner(5)
            .tickSize(5)

        this.xAxisContainer = this.container
            .append("g")
            .attr("width", this.config.width)
            .attr("height", this.config.height)
            .attr("class", "x axis axis-text")
            .call(this.xAxis);
    }
    Zoom(min, max) {
        super.ZoomX(min, max)
    }
    _updateDraw() {
        this.xAxis.scale(this.scaleX);
        this.xAxisContainer.call(this.xAxis);
    }
}