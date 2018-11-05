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
            z: null,
            mouseOut: null,
            mouseOver: null,
            r: 3,
        };

        this._init(container, data, config);
        this._initScales();
        this._draw();
    }
    _initScales() {
        super._initScales();

        if (this.config.z) {
            this.domainZ = this.config.domainZ || d3.extent(this.__flattenData, this.config.z);
            this.scaleZ = this.config.scaleZ || d3.scaleLinear()
                .range([this.config.r / 5, this.config.r])
                .domain(this.domainZ);
        } else {
            this.scaleZ = d => this.config.r;
        }
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
                .attr("r", d => this.scaleZ(this.config.y(d)));

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
                .attr("r", d => this.scaleZ(this.config.y(d)));

            // update
            selection
                .attr("cx", d => this.scaleX(this.config.x(d)))
                .attr("cy", d => this.scaleY(this.config.y(d)))
                .attr("r", d => this.scaleZ(this.config.y(d)));

            selection.exit().remove();
        }
    }
}