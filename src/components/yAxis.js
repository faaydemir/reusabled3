class yAxis extends d3Base {
    constructor(container, data, config) {
        super();
        this._defaultConfig = {
            tickCount: 10,
            width: 50,
            height: "100%",
            maxDataCount: null,
            scaleX: null,
            y: d => d.y,
            domainX: null,
            format: d => d,
        };

        this._init(container, data, config);
        this._initScales();
        this._draw();

    }
    _draw() {

        this.yAxis = d3.axisLeft()
            .scale(this.scaleY)
            .ticks(this.config.tickCount)
            .tickFormat(this.config.format)
            .tickSizeOuter(5)
            .tickPadding(5)
            .tickSizeInner(5)
            .tickSize(5)

        this.yAxisContainer = this.container
            .append("g")
            .attr("width", this.config.width)
            .attr("height", this.config.height)
            .attr("transform", "translate(" + this.config.width + "," + 0 + ")")
            .attr("class", "y axis axis-text")
            .call(this.yAxis);
    }
    Zoom(min, max) {
        super.ZoomY(min, max)
    }
    _updateDraw() {
        this.yAxis.scale(this.scaleY);
        this.yAxisContainer.call(this.yAxis);
    }
}