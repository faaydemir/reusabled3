import d3Base from "./d3-base";
import * as d3 from "d3";
import {
    sleep
} from "../utils";

export default class DataFocus extends d3Base {
    constructor(contanier, data, config) {

        super(contanier, data, config);

        this._defaultConfig = {
            width: '100%',
            height: '100%',
            onTooltipCreated: null,
            x: d => d.x,
            y: d => d.y,
            r: 5,
            color: "red",
        };

        this.eventListeners = {
            onMouseOver: (n, s, args) => this.show(args.d, args.x, args.y),
            // onMouseOut: (n, s, args) => this.hide()
        };

    }

    _draw() {

        this._focusContainer = this.container
            .append("g")
            .attr("width", this.width)
            .attr("height", this.height);

        this.circle = this._focusContainer
            .append("circle")
            .attr("fill", this.config.color)
            .attr("class", "circle")
            .attr("cx", -50)
            .attr("cy", -50)
            .attr("r", this.config.r);

        this.xLine = this._focusContainer
            .append("line") // attach a line
            .style("stroke", this.config.color)
            .attr("x1", -100)
            .attr("y1", 0)
            .attr("x2", -100)
            .attr("y2", this.height);

        this.yLine = this._focusContainer
            .append("line") // attach a line
            .style("stroke", this.config.color)
            .attr("x1", 0)
            .attr("y1", -100)
            .attr("x2", this.width)
            .attr("y2", -100);
    }

    hide() {
        this.circle
            .attr("cx", -100)
            .attr("cy", -100);

        this.xLine
            .attr("x1", -100)
            .attr("x2", -100);

        this.yLine
            .attr("y1", -100)
            .attr("y2", -100);
    }
    _updateDraw() {
        if (this.focusedData) {
            let x = this.scaleX(this.config.x(this.focusedData));
            let y = this.scaleY(this.config.y(this.focusedData));
            if (x < 0 || y < 0) {
                this.hide();
                this.focusedData = null;
            } else {
                this.circle
                    .attr("cx", x)
                    .attr("cy", y);

                this.xLine
                    .attr("x1", x)
                    .attr("x2", x)

                this.yLine
                    .attr("y1", y)
                    .attr("y2", y);
            }
        }
    }

    show(d, pageX, pageY) {
        this.focusedData = d;
        this._updateDraw();
    }
}