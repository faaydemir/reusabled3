class Line extends d3Base {

    constructor(container, data, config) {

        super();

        this.lines = {};

        this._defaultConfig = {
            colorMap: d3.scaleOrdinal(d3.schemeCategory10),
            yAxisWidth: 40,
            xAxisHeight: 40,
            strokeWidth: 1,
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
            curve: d3.curveStep,
            hoverOpacity: 1,
            hoverStrokeWidth: 2,
            curve: "curveBasis",
        };

        this._init(container, data, config);
        this._initScales();
        this._draw();
    }

    _draw() {
        this.d = d3.line()
            .x(d => {
                return this.scaleX(this.config.x(d));

            })
            .y(d => {
                return this.scaleY(this.config.y(d));
            })
            .curve(d3[this.config.curve]);

        this._lineContainer = this.container
            .append("svg")
            .attr("width", this.config.width)
            .attr("height", this.config.height);

        for (var key in this.data) {
            if (!this.data.hasOwnProperty(key)) continue;

            let color = this.config.colorMap(key);
            this.lines[key] = this._lineContainer.append("path")
                .datum(this.data[key])
                .attr("d", this.d)
                .attr("class", "line")
                .attr("stroke", color)
                .attr("stroke-width", this.config.strokeWidth)
                .attr("opacity", this.config.opacity)
                .on("mouseover", this.OnMouseOver(this))
                .on("mouseout", this.OnMouseOut(this));
        }

    }


    OnMouseOver(self) {
        return function(d, i) {
            let bisector = d3.bisector(self.config.x).left;
            let x0 = self.scaleX.invert(d3.mouse(this)[0]);
            let selectedIndex = bisector(d, x0, 1);
            let args = {}

            args.d = d[selectedIndex];
            args.i = i
            args.x = event.pageX;
            args.y = event.pageY;
            self._raiseEvent(EventTypes.onMouseOver, self, args);
        }
    }
    OnMouseOut(self) {
        return function(d, i) {
            let args = {}
            args.d = d;
            args.i = i
            args.x = event.pageX;
            args.y = event.pageY;
            self._raiseEvent(EventTypes.onMouseOut, self, args);
        }
    }

    SetHover(key, rate) {

        if (!IsNull(this.lines[key])) {

            let opacity = this.config.opacity;
            let strokewidth = this.config.strokeWidth;

            if (!(rate == null) && !(rate == 0)) {
                opacity = (this.config.hoverOpacity - this.config.opacity) * rate + this.config.opacity;
                strokewidth = (this.config.hoverStrokeWidth - this.config.strokeWidth) * rate + this.config.strokeWidth;
            }

            this.lines[key]
                .attr("opacity", opacity)
                .attr("stroke-width", strokewidth)
                .moveToFront();
        }
    }

    _updateDraw() {
        for (var key in this.data) {
            if (!this.lines.hasOwnProperty(key)) continue;
            if (!this.data.hasOwnProperty(key)) continue;

            //updvalueate data
            this.lines[key].datum(this.data[key]);
        }
        this._lineContainer.selectAll("path").attr("d", this.d);
    }

}