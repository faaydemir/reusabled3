class Circle extends d3Base {
    constructor(container, data, config) {

        super();

        this.circles = {};

        this._defaultConfig = {
            colorMap: d3.scaleOrdinal(d3.schemeCategory10),
            opacity: 0.5,
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
            r: 5,
        };

        this._init(container, data, config);
        this._initScales();
        this._draw();
    }
    _draw() {
        this._circleContainer = this.container
            .append("g")
            .attr("width", this.config.width)
            .attr("height", this.config.height);



        for (var key in this.data) {
            if (!this.data.hasOwnProperty(key)) continue;

            let color = this.config.colorMap(key);
            this.circles[key] = this._circleContainer.append("g")

            this.circles[key].selectAll(".circle")
                .data(this.data[key])
                .enter()
                .append("circle")
                .attr("fill", color)
                .attr("class", "circle")
                .attr("cx", d => this.scaleX(this.config.x(d)))
                .attr("cy", d => this.scaleY(this.config.y(d)))
                .attr("r", this.config.r)

        }

    }

    _updateDraw() {

        for (var key in this.data) {
            if (!this.data.hasOwnProperty(key)) continue;

            let color = this.config.colorMap(key);

            let selection = this.circles[key].selectAll(".circle")
                .data(this.data[key]);

            // add 
            selection.enter().append("circle")
                .attr("fill", color)
                .attr("class", "circle")
                .attr("cx", d => this.scaleX(this.config.x(d)))
                .attr("cy", d => this.scaleY(this.config.y(d)))
                .attr("r", this.config.r);

            // update
            selection
                .attr("cx", d => this.scaleX(this.config.x(d)))
                .attr("cy", d => this.scaleY(this.config.y(d)))
                .attr("r", this.config.r);

            selection.exit().remove();
        }
    }
}