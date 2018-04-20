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
npm start
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
```
## Scale
```
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
```
## Axis
```
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
```
## Complete Bar Chart
```
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
```
## Pie Chart
```
const width = 300
        , height = 300
        , dataset = [30, 10, 43, 55, 13]
        , pie = d3.pie()
        , piedata = pie(dataset)
        , outerRadius = 120 //外半径
        , innerRadius = 50 //内半径，为0则中间没有空白
        , color = ['#FFE100', 'grey', 'orange', 'red', '#25acea']
        , svg = d3.select("#pie-chart").select("figure")
            .append("svg")
            .attr('width', width)
            .attr('height', height)
        , arc = d3.arc()  //弧生成器
            .innerRadius(innerRadius)   //设置内半径
            .outerRadius(outerRadius)  //设置外半径
        , arcOver = d3.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius + 10)
        , arcs = svg.selectAll("g")
            .data(piedata)
            .enter()
            .append("g")
            .style('cursor', 'pointer')
            .attr("transform", "translate(" + (width / 2) + "," + (width / 2) + ")");
    /*append path*/
    arcs.append('path')
        .attr('fill', (d, i) => color[i])
        .attr('d', d => arc(d))
        .on('mouseover', function (d, i) {
            d3.select(this).attr('d', d => arcOver(d))
        })
        .on('mouseout', function (d, i) {
            d3.select(this).attr('d', d => arc(d));
        });
    /*append text*/
    arcs.append('text')
        .attr('transform', d => 'translate(' + arc.centroid(d) + ')')
        .attr('text-anchor', 'middle')
        .attr('fill', '#fff')
        .text(d => d.data);
```
## Force Chart
```
const graph = {
        "nodes": [
            { name: '桂林' },
            { name: '广州' },
            { name: '南京' },
            { name: '杭州' },
            { name: '北京' },
            { name: '上海' },
            { name: '深圳' },
            { name: '福州' },
            { name: '厦门' },
            { name: '邯郸' },
            { name: '长沙' },
            { name: '岳阳' },
            { name: '香港' }
        ],
        "links": [
            { "source": 0, "target": 1 },
            { "source": 1, "target": 2 },
            { "source": 2, "target": 0 },
            { "source": 1, "target": 3 },
            { "source": 3, "target": 2 },
            { "source": 3, "target": 4 },
            { "source": 4, "target": 5 },
            { "source": 5, "target": 6 },
            { "source": 5, "target": 7 },
            { "source": 6, "target": 7 },
            { "source": 6, "target": 8 },
            { "source": 7, "target": 8 },
            { "source": 9, "target": 4 },
            { "source": 9, "target": 5 },
            { "source": 9, "target": 11 },
            { "source": 9, "target": 10 },
            { "source": 10, "target": 11 },
            { "source": 11, "target": 12 },
            { "source": 12, "target": 10 }
        ]
    }
        , width = 800
        , height = 500
        , svg = d3.select("#force-chart").select("figure")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
        , forceLink = d3.forceLink(graph.links).distance(50)
        , color = d3.schemeSet3
        , drag = d3.drag()//define drag
            .on("start", function (d) {
                if (!d3.event.active) {
                    force.alphaTarget(.1).restart();
                }
                d.fx = d.x;
                d.fy = d.y;
            })
            .on("drag", function (d) {
                d.fx = d3.event.x;
                d.fy = d3.event.y;
            })
        , link = svg.selectAll(".link")/*append line*/
            .data(graph.links)
            .enter()
            .append("line")
            .style("stroke", "#ccc")
            .style("stroke-width", 1)
        , nodes = svg.selectAll("circle")/*append nodes */
            .data(graph.nodes)
            .enter()
            .append("circle")
            .attr("r", 20)
            .attr("cursor", "move")
            .style('fill', (d, i) => color[i])
            .call(drag)
        , texts = svg.selectAll("text")/*append texts*/
            .data(graph.nodes)
            .enter()
            .append("text")
            .style("fill", "black")
            .attr("dx", 20)
            .attr("dy", 8)
            .text(d => d.name)
        , force = d3.forceSimulation()
            .nodes(graph.nodes)
            .force("link", forceLink)
            .force("charge", d3.forceManyBody().strength(-100))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .on("tick", function () {
                link.attr("x1", d => d.source.x)//update link
                    .attr("y1", d => d.source.y)
                    .attr("x2", d => d.target.x)
                    .attr("y2", d => d.target.y);
                nodes.attr("cx", d => d.x)//update nodes
                    .attr("cy", d => d.y);
                texts.attr("x", d => d.x)//update texts
                    .attr("y", d => d.y);
            });
```
## Chord Chart
```
const city_name = ["北京", "上海", "广州", "深圳", "香港"]
        , population = [
            [1000, 3045, 4567, 1234, 3714],
            [3214, 2000, 2060, 124, 3234],
            [8761, 6545, 3000, 8045, 647],
            [3211, 1067, 3214, 4000, 1006],
            [2146, 1034, 6745, 4764, 5000]
        ]
        , width = 500
        , height = 500
        , innerRadius = width / 2 * 0.7
        , outRadius = innerRadius * 1.1
        , color = d3.schemeSet3
        , chord_layout = d3.chord()(population)
        , groups = chord_layout.groups
        , chords = chord_layout.splice(0, chord_layout.length)
        , outer_arc = d3.arc()
            .innerRadius(innerRadius)
            .outerRadius(outRadius)
        , svg = d3.select("#chord-chart").select("figure")
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
        , g_outer = svg.append("g")
        , ribbon = d3.ribbon()//draw ribbon
            .radius(innerRadius);
    console.log('grous，chords', groups, chords);
    g_outer.selectAll("path")//append outer
        .data(groups)
        .enter()
        .append("path")
        .style("fill", d => color[d.index])
        .style("stroke", d => color[d.index])
        .attr("d", outer_arc);
    g_outer.selectAll("text")//append text
        .data(groups)
        .enter()
        .append("text")
        .each(function (d, i) {
            d.angle = (d.startAngle + d.endAngle) / 2;
            d.name = city_name[i];
        })
        .attr("dy", ".35em")
        .attr("transform", d => "rotate(" + (d.angle * 180 / Math.PI) + ")" +
                "translate(0," + -1.0 * (outRadius + 10) + ")" +
                ((d.angle > Math.PI * 3 / 4 && d.angle < Math.PI * 5 / 4) ? "rotate(180)" : ""))
        .text(d => d.name);
    svg.append('g')/*append ribbon*/
        .selectAll('path')
        .data(chords)
        .enter()
        .append('path')
        .attr('d', ribbon)
        .style('cursor', "pointer")
        .style('stroke', "black")
        .style('opacity', 0.8)
        .style('fill', d => color[d.source.index])
        .on('mouseover', function (d, i) {
            d3.select(this)
                .style('fill', 'yellow')
        })
        .on('mouseout', function (d, i) {
            d3.select(this)
                .transition()
                .duration(1000)
                .style('fill', color[d.source.index]);
        })
```
## Cluster Chart
```
const width = 600
        , height = 600
        , svg = d3.select("#cluster-chart").select("figure")
            .append('svg')
            .attr('width', width)
            .attr('height', height);
    d3.json('../store/json/area.json?t=' + new Date().getTime()).then(function (json) {
        const clusterCreator = d3.cluster().size([width, height - 200])
            , hierarchyData = d3.hierarchy(json)
            , clusterData = clusterCreator(hierarchyData)
            /*nodes*/
            , nodes = clusterData.descendants()
            /*links*/
            , links = clusterData.links();
        /**append links*/
        svg.append("g")
            .attr("transform", "translate(40,0)").selectAll("path")
            .data(links)
            .enter()
            .append("path")
            .attr("fill", "none")
            .style("stroke", "#ccc")
            .style("stroke-width", "1.5px")
            .attr("d", d3.linkHorizontal().x(d => d.y).y(d => d.x));
        /*append circle*/
        svg.append('g')
            .attr("transform", "translate(40,0)").selectAll("circle")
            .data(nodes)
            .enter()
            .append("circle")
            .attr("fill", "#fff")
            .style("stroke", "orange")
            .style("stroke-width", "1.5px")
            .attr('cx', d => d.y)
            .attr('cy', d => d.x)
            .attr("r", 5);
        /*append text*/
        svg.append('g')
            .attr("transform", "translate(40,0)").selectAll('text')
            .data(nodes)
            .enter()
            .append('text')
            .attr('x', d => d.y)
            .attr('y', d => d.x)
            .text(d => d.data.name)
            .style("text-anchor", d => d.children ? "end" : "start")
            .attr("dx", d => d.children ? -10 : 10)
            .attr('dy', 5)
    })
```
## Pack Chart
```
const width = 500
        , height = 500
        , skyBlue = "rgb(31, 119, 180)"
        , svg = d3.select("#pack-chart").select("figure")
            .append('svg')
            .attr('width', width)
            .attr('height', height);
    d3.json('../store/json/city.json?t=' + new Date().getTime())
        .then(function (json) {
            const packCreator = d3.pack().size([width, height]).padding(3)
                , hierarchyData = d3.hierarchy(json, d => d.children)//基于基础数据生成hierarchy数据
                    .sum(d => d.number || 500)
                , packData = packCreator(hierarchyData)
                , nodes = packData.descendants()
                , gCircles = svg
                    .selectAll('g')
                    .data(nodes)
                    .enter()
                    .append('g')
                    .attr("transform", d => `translate(${d.x}, ${d.y})`);
            gCircles.append('circle')
                .attr('r', d => d.r)
                .style("fill", d => (d.value >= 1000 && !d.children) ? "orange" : skyBlue)
                .attr("fill-opacity", "0.5")
                .on("mouseover", function (d, i) {
                    d3.select(this)
                        .style("fill", (d.value >= 1000 && !d.children) ? "red" : "#D7FAE1");
                })
                .on("mouseout", function (d, i) {
                    d3.select(this)
                        .transition()
                        .style("fill", (d.value >= 1000 && !d.children) ? "orange" : skyBlue);
                });
            gCircles.filter(d => !d.children)
                .append('text')
                .style('fill', '#fff')
                .style('font-size', '12px')
                .text(d => d.data.name)
            gCircles.filter(d => d.children)
                .append("title")
                .text(d => d.data.name);
        });
```
## Geo Chart
```
const width = 950
        , height = 750
        , color = d3.schemeCategory10.concat(d3.schemePaired, d3.schemeSet3)
        , svg = d3.select("#geo-chart").select("figure")
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .attr("viewBox", "0 0 " + width + " " + height)
            .call(d3.zoom().scaleExtent([0.2, 5]).on("zoom", function () {
                svg.selectAll('path')
                    .attr("transform", d3.event.transform);
                svg.selectAll('text')
                    .attr("transform", d3.event.transform);
            }));
    const projection = d3.geoMercator()
        , path = d3.geoPath()
            .projection(projection);
    d3.json('../store/json/china.geojson?t=' + new Date().getTime()).then(function (json) {
        projection.fitSize([width, height], json);
        /*append path*/
        svg.selectAll('path')
            .data(json.features)
            .enter()
            .append('path')
            .attr('stroke', '#000')
            .attr('stroke-width', 1)
            .style('cursor', 'pointer')
            .attr('fill', (d, i) => color[i])
            .attr('d', path)
            .on('mouseover', function (d, i) {
                d3.select(this)
                    .attr('fill', 'yellow');
            })
            .on('mouseout', function (d, i) {
                d3.select(this)
                    .attr('fill', color[i])
            });
        /*append text*/
        svg.selectAll("text")
            .data(json.features)
            .enter()
            .append("text")
            .text(d => d.properties.name)
            .attr('dx', d => path.centroid(d)[0])
            .attr('dy', d => path.centroid(d)[1])
            .attr('fill', '#000')
            .attr('font-size', '14px')
            .attr('text-anchor', 'middle');
    });
```