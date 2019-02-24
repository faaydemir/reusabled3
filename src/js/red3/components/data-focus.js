import d3Base from "./d3-base";
import * as d3 from "d3";
import {
    sleep
} from "../utils";

export default class DataFocus extends d3Base {
    constructor(contanier, data, config) {

        super(contanier, data, config);

        this._defaultConfig = {
            html: d => JSON.stringify(d) + "<br/>",
            class: "tooltip-default",
            id: "tooltip",
            container: "body",
            time: 1000,
            onTooltipCreated: null,
        };

        this.eventListeners = {
            onMouseOver: (n, s, args) => this.show(args.d, args.x, args.y),
            onMouseOut: (n, s, args) => this.hide()
        };

        this.AppendData = null;
        this.UpdateData = null;
    }

    _draw() {

        this._focusContainer = this.container
            .append("g")
            .attr("width", this.width)
            .attr("height", this.height);

        this.circle = this._focusContainer
            .append("circle")
            .attr("fill", "red")
            .attr("class", "circle")
            .attr("cx", d => 50)
            .attr("cy", d => 50)
            .attr("r", d => 10);

        // this.lineX = _focusContainer.append('line')

        //this.scaleZ(this.config.y(d));
    }

    hide() {

        this.TooltipDiv.transition()
            .delay(this.config.time)
            .style("opacity", 0)
            .style("top", "0px");

    }
    _setData() {

    }
    _updateDraw() {

    }
    show(d, x, y) {

        this.circle = _focusContainer
            .append("circle")
            .attr("fill", "red")
            .attr("class", "circle")
            .attr("cx", d => this.scaleX(this.config.x(d)))
            .attr("cy", d => this.scaleY(this.config.y(d)))


        // for (var key in this.data) {
        //     if (!this.data.hasOwnProperty(key)) continue;

        //     let color = this.config.colorMap(key);
        //     this.circles[key] = this._focusContainer.append("g");

        //     this.circles[key].selectAll(".circle")
        //         .data(this.data[key])
        //         .enter()
        //         .append("circle")
        //         .attr("fill", color)
        //         .attr("class", "circle")
        //         .attr("cx", d => this.scaleX(this.config.x(d)))
        //         .attr("cy", d => this.scaleY(this.config.y(d)))
        //         .attr("r", d => this.scaleZ(this.config.y(d)));

        //     this.TooltipDiv.transition();
        //     this.TooltipDiv
        //         .style("left", (x + "px"))
        //         .style("top", (y + "px"))
        //         .html(this.config.html(d))
        //         .style("opacity", 1)
        //         .style("position", "absolute")
        //         .style("z-index", "100");

        //     let rect = this.TooltipDiv.node().getBoundingClientRect();
        //     let bodyRect = this.TooltipDiv.node().getBoundingClientRect();

        //     if ((x > rect.width / 2) && (y > rect.height)) {
        //         x = x - rect.width / 2;
        //         y = y - rect.height;
        //     }
        //     if ((x + rect.width / 2) > bodyRect.width) {
        //         x = x - rect.width / 2;
        //     }
        //     if (this.config.onTooltipCreated) {
        //         this.config.onTooltipCreated(d);
        //     }
        // }
    }
}