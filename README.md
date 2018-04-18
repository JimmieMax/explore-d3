# explore-d3
d3 v5
## Tech Stack :strawberry:
 - [Node](https://nodejs.org)
 - [Webpack](https://webpack.js.org)
 - [D3](https://d3js.org/)
 ## Installation :green_apple:

```
$ git clone https://github.com/JimmieMax/explore-d3.git
$ npm install
```
## Compile & Browse :cherries:
```
npm run compile
npm run server
```
## Selections
```
d3.select("#selections").select("figure")
    .selectAll("p")
    .style("color", "orange");
```
## Dynamic Properties
```
d3.select("#properties").select("figure")
    .selectAll("p")
    .style("background-color", (d, i) => i % 2 ? "#fff" : "#eee");
```
## Enter and Exit
```
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
```
## Transitions
```
d3.select("#transitions").select("figure")
    .transition()
    .duration(2000)
    .delay(1000)
    .style("background-color", "black");

```
## Simple Chart
```
const simpleChart = {
    rectHeight: 25
};
d3.select("#simple-chart").select("figure")
    .append("svg")
    .attr("width", "100%")
    .attr("height", 120)
    .selectAll("rect")
    .data([250, 210, 170, 130, 90])
    .enter()
    .append("rect")
    .attr("x", 20)
    .attr("y", (d, i) => i * simpleChart.rectHeight)
    .attr("width", d => d)
    .attr("height", simpleChart.rectHeight - 2)
    .attr("fill", "orange");
```
## Scale
```
const scale = {};
scale.dataset = [1.2, 2.3, 0.9, 1.5, 3.3];
scale.rectHeight = 25;
scale.linear = d3.scaleLinear()
    .domain([0, d3.max(scale.dataset)])
    .range([0, 300]);

d3.select("#scale").select("figure")
    .append("svg")
    .attr("width", "100%")
    .attr("height", 120)
    .selectAll("rect")
    .data(scale.dataset)
    .enter()
    .append("rect")
    .attr("x", 20)
    .attr("y", (d, i) => i * scale.rectHeight)
    .attr("width", d => scale.linear(d))
    .attr("height", scale.rectHeight - 2)
    .attr("fill", "orange");
```
## Axis
```
const axis = {};
axis.dataset = [2.5, 2.1, 1.7, 1.3, 0.9];
axis.rectHeight = 25;
axis.linear = d3.scaleLinear()
    .domain([0, d3.max(axis.dataset)])
    .range([0, 300]);
axis.axis = d3.axisBottom(axis.linear);
axis.svg = d3.select("#axis").select("figure")
    .append("svg");

axis.svg.attr("width", "100%")
    .attr("height", 200)
    .selectAll("rect")
    .data(axis.dataset)
    .enter()
    .append("rect")
    .attr("x", 20)
    .attr("y", (d, i) => i * axis.rectHeight + 20)
    .attr("width", d => axis.linear(d))
    .attr("height", axis.rectHeight - 2)
    .attr("fill", "orange");

axis.svg.append("g")
    .attr("transform", "translate(20,150)")
    .call(axis.axis);
```
## Bar Chart