const drawMethods = {};

/**
 * @param  {} div 
 * @param  {} data
 */
drawMethods["simple"] = function(div, data, chartType) {

    // Chart types = Line,Bar,SparkLine,Circle,LineZoom,BarZoom,All,Radial

    const chart = chartType.Builder
        .container(div)
        .data(data)
        .x(d => d.x)
        .y(d => d.y)
        .build();

    chart.draw();
}
drawMethods["with-different-component-config"] = function(div, data, chartType, dataLine, lineData) {


}
drawMethods["resize"] = function(div, data, chartType, dataLine, lineData) {


}
drawMethods["with-different-data"] = function(div, data, chartType, dataLine, lineData) {

    const chart = chartType.Builder
        .container(div)
        .data(data)
        .x(d => d.x)
        .y(d => d.y)
        .line(line => {
            line = Line.Builder()
                .x(d => d.x)
                .y(d => d.z)
                .data(lineData)
        })
        .bar(bar => {
            bar = Line.Builder()
                .x(d => d.x)
                .y(d => d.z)
                .data(barData);
        })
        .build();

    chart.Draw();
}

drawMethods["with-custom-component"] = function() {
    const chart = chartType.Builder
        .container(div)
}

drawMethods["real-time-data"] = function() {

}
drawMethods["real-time-data"] = function() {

}