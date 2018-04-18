import * as d3 from "d3";

// #Selections
{
    d3.select("#selections").select("figure")
        .selectAll("p")
        .style("color", "orange");
}

// #Dynamic Properties
{
    d3.select("#properties").select("figure")
        .selectAll("p")
        .style("background-color", (d, i) => i % 2 ? "#fff" : "#eee");
}

// #Enter and Exit
{
    // Enter
    d3.select("#enter-exit").select("figure")
        .select(".enter-box")
        .selectAll("p")
        .data([4, 8, 15, 16, 23])
        .enter().append("p")//父选择器后面添加元素
        // .insert("p","p:nth-child(1)") //插入具体的位置
        .text(d => "I’m append number " + d + "!");
    //Exit
    d3.select("#enter-exit").select("figure")
        .select("exit-box")
        .selectAll("span")
        .data(['a', 'b', 'c'])
        .attr("title", d => "I’m " + d)
        .exit().remove();//删除元素
}

// #Transitions
{
    d3.select("#transitions").select("figure")
        .transition()
        .duration(2000)
        .delay(1000)
        .style("background-color", "black");
}

// #Simple Chart
{
    const rectHeight = 25
    d3.select("#simple-chart").select("figure")
        .append("svg")
        .attr("width", "100%")
        .attr("height", 120)
        .selectAll("rect")
        .data([250, 210, 170, 130, 90])
        .enter()
        .append("rect")
        .attr("x", 20)
        .attr("y", (d, i) => i * rectHeight)
        .attr("width", d => d)
        .attr("height", rectHeight - 2)
        .attr("fill", "orange");
}

// #Scale
{
    const dataset = [1.2, 2.3, 0.9, 1.5, 3.3]
        , rectHeight = 25
        , linear = d3.scaleLinear()
            .domain([0, d3.max(dataset)])
            .range([0, 300]);
    d3.select("#scale").select("figure")
        .append("svg")
        .attr("width", "100%")
        .attr("height", 120)
        .selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", 20)
        .attr("y", (d, i) => i * rectHeight)
        .attr("width", d => linear(d))
        .attr("height", rectHeight - 2)
        .attr("fill", "orange");
}

// #Axis
{
    const dataset = [2.5, 2.1, 1.7, 1.3, 0.9]
        , rectHeight = 25
        , linear = d3.scaleLinear()
            .domain([0, d3.max(dataset)])
            .range([0, 300])
        , axis = d3.axisBottom(linear)
            .ticks(5)
        , svg = d3.select("#axis").select("figure")
            .append("svg")
            .attr("width", "100%")
            .attr("height", 200);
    // append bar
    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", 20)
        .attr("y", (d, i) => i * rectHeight + 20)
        .attr("width", d => linear(d))
        .attr("height", rectHeight - 2)
        .attr("fill", "orange");
    //append axis
    svg.append("g")
        .attr("transform", "translate(20,150)")
        .call(axis);
}

// #Complete Bar Chart
{
    const height = 300
        , width = "100%"
        , padding = {
            left: 30,
            right: 30,
            top: 20,
            bottom: 20
        }
        , rectPadding = 4
        , rectWidth = 25
        , dataset = [10, 20, 30, 40, 33, 24, 12, 5]
        //xScale
        , xScale = d3.scaleOrdinal()
            .domain(d3.range(dataset.length))
            .range(d3.range((rectWidth - rectPadding) / 2 + rectPadding, rectWidth * dataset.length, rectWidth * dataset.length / 8))
        //yScale
        , yScale = d3.scaleLinear()
            .domain([0, d3.max(dataset)])
            .range([height - padding.top - padding.bottom, 0])
        //xAxis
        , xAxis = d3.axisBottom(xScale)
        //yAxis
        , yAxis = d3.axisLeft(yScale)
        , svg = d3.select("#bar-chart").select("figure")
            .append("svg")
            .attr("width", width)
            .attr("height", height);
    //append rect
    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
        .attr("x", (d, i) => i * rectWidth + rectPadding)
        .attr("y", d => yScale(d))
        .attr("width", rectWidth - rectPadding)
        .attr("height", d => height - padding.top - padding.bottom - yScale(d))
        .attr("fill", "orange");
    // append text
    svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
        .attr("x", (d, i) => i * rectWidth + rectPadding)
        .attr("y", d => yScale(d) - 2)
        .attr("text-anchor", "middle")
        .attr("dx", (rectWidth - rectPadding) / 2)
        .text(d => d);
    //append xAxis
    svg.append("g")
        .attr("transform", "translate(" + padding.left + "," + (height - padding.bottom + 2) + ")")
        .call(xAxis);
    //append yAxis
    svg.append("g")
        .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
        .call(yAxis);
}
console.log();