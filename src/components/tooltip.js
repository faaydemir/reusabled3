class Tooltip extends d3Base {
    constructor(contanier, data, config) {

        super();
        this._defaultConfig = {
            html: d => JSON.stringify(d) + "<br/>",
            class: "tooltip",
            id: "tooltip",
            contanier: "body"

        }
        this.eventListeners = {
            onMouseOver: (n, s, args) => this.Show(args.d, args.x, args.y),
            onMouseOut: (n, s, args) => this.Hide()
        }

        this._init(null, config);
        this._draw();
        this.AppendData = null;
        this.UpdateData = null;
    }
    _draw() {
        this.TooltipDiv = d3.select(this.config.contanier).append("div")
            .attr("class", this.config.class)
            .style("opacity", 0);
    }

    Hide() {

        this.TooltipDiv.transition()
            .duration(1000)
            .style("opacity", 0)
            .transition()
                    .style("left", "0px")
                    .style("top", "0px");
            
    }

    Show(d, x, y) {


        this.TooltipDiv.transition()
            .duration(50)
            .style("opacity", 0.9);


        this.TooltipDiv
            .html(this.config.html(d))
            .style("left", (x + "px"))
            .style("top", (y + "px"));
    }

}