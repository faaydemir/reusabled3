class Bar extends d3Base {
    constructor(container, data, config) {

        super();

        this.bars = {};

        this._defaultConfig = {
            colorMap: d3.scaleOrdinal(d3.schemeCategory10),
            yAxisWidth: 40,
            xAxisHeight: 40,
            strokeWidth: 1,
            opacity: 0.3,
            width: "100%",
            height: "100%",
            maxDataCount: null,
            minX: null,
            maxX: null,
            minY: null,
            maxY: null,
            x: d => d.x,
            y: d => d.y,
            mouseOut: null,
            mouseOver: null,
            curve: d3.curveStep,
            barWidth: 5,
            onFocus: {
                opacity: 1,
                colorMap: d3.scaleOrdinal(d3.schemeCategory10),
            }

        };
        this.eventListeners = {
            onMouseOverLabel: (n, s, args) => this.__focus(args.d),
            onMouseOutLabel: (n, s, args) => this.__unfocus(args.d),
        }
        this._init(container, data, config);
        this._initScales();
        this._draw();
    }
    _draw() {
        let barIndex = 0;
        let barWidth = this._calculateBarWidth();

        this._barContainer = this.container
            .append("g")
            .attr("width", this.config.width)
            .attr("height", this.config.height);



        for (var key in this.data) {
            if (!this.data.hasOwnProperty(key)) continue;

            let barOfset = barWidth * barIndex;

            let color = this.config.colorMap(key);

            this.bars[key] = this._barContainer.append("g")

            this.bars[key].selectAll(".bar")
                .data(this.data[key])
                .enter()
                .append("rect")
                .attr("fill", color)
                .attr("class", "bar")
                .attr("x", d => this.scaleX(this.config.x(d)) + barOfset)
                .attr("y", d => this.config.height - this.scaleY(this.config.y(d)))
                .attr("width", barWidth)
                .attr("height", d => this.scaleY(this.config.y(d)));

            barIndex++;
        }

    }

    __focus(key) {
        this.bars[key]
            .attr("opacity", this.config.onFocus.opacity)
            .attr("fill", this.config.onFocus.colorMap(key))
            .moveToFront();
    }

    __unfocus(key) {
        this.bars[key]
            .attr("opacity", this.config.opacity)
            .attr("fill", this.config.colorMap(key))
            .moveToFront();
    }

    _updateDraw() {
        let barIndex = 0;
        let barWidth = this._calculateBarWidth();



        for (var key in this.data) {
            if (!this.data.hasOwnProperty(key)) continue;

            let barOfset = barWidth * barIndex;

            let color = this.config.colorMap(key);

            let selection = this.bars[key].selectAll(".bar")
                .data(this.data[key]);

            // add 
            selection.enter().append("rect")
                .attr("fill", color)
                .attr("class", "bar")
                .attr("x", d => this.scaleX(this.config.x(d)) + barOfset)
                .attr("y", d => this.config.height - this.scaleY(this.config.y(d)))
                .attr("width", barWidth)
                .attr("height", d => this.scaleY(this.config.y(d)));

            // update
            selection.attr("x", d => this.scaleX(this.config.x(d)) + barOfset)
                .attr("y", d => this.config.height - this.scaleY(this.config.y(d)))
                .attr("width", barWidth)
                .attr("height", d => this.scaleY(this.config.y(d)));

            selection.exit().remove();

            barIndex++;
        }
    }
    _calculateBarWidth() {
        let maxLength = 0;
        let barCount = Object.keys(this.data).length

        for (var key in this.data) {
            if (!this.data.hasOwnProperty(key)) continue;
            if (this.data[key].length > maxLength)
                maxLength = this.data[key].length;
        }
        let barWidth = this.config.width / (maxLength * (barCount + 1));
        if (this.config.barWidth < barWidth)
            barWidth = this.config.barWidth
        return barWidth;
    }
}