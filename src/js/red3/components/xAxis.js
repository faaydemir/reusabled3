import d3Base from './d3-base';
import * as d3 from 'd3';

export default class xAxis extends d3Base {
    constructor(container, data, config) {
        super(container, data, config);
        this._defaultConfig = {
            tickCount: 10,
            width: '100%',
            height: '100%',
            maxDataCount: null,
            scaleX: null,
            resize: true,
            x: d => d.x,
            domainX: null,
            format: d => d,
            textColor: null,
            strokeColor: null,
            tickSizeOuter: 0,
            tickPadding: 5,
            tickSizeInner: 0,
            tickSize: 5,
        };
    }
    _draw() {

        this.xAxis = d3.axisBottom()
            .scale(this.scaleX)
            .ticks(this.config.tickCount)
            .tickFormat(this.config.format)
            .tickSizeOuter(this.config.tickSize)
            .tickSizeInner(this.config.tickSize)
            .tickPadding(this.config.tickPadding);

        this.xAxisContainer = this.container
            .append("g")
            .attr("width", this.width)
            .attr("height", this.height)
            .attr("class", "x axis axis-text")
            .call(this.xAxis);
        if (this.config.textColor)
            this.xAxisContainer.selectAll("text").attr("fill", this.config.textColor);

        if (this.config.strokeColor) {
            this.xAxisContainer.selectAll("line").attr("stroke", this.config.strokeColor);
            this.xAxisContainer.selectAll("path").attr("stroke", this.config.strokeColor);
        }
    }
    Zoom(min, max) {
        super.ZoomX(min, max)
    }
    _updateDraw() {
        this.xAxis.scale(this.scaleX);
        this.xAxisContainer.call(this.xAxis);
    }
}