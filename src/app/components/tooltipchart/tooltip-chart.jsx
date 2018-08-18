import React from "react";
import ReactDOM from "react-dom";
export class TooltipChart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            display: "none",
            transform: ""
        }
    }

    componentDidMount() {

    }

    render() {

        let {display, transform} = this.state;

        var margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var parseTime = d3.timeParse("%Y"),
            bisectDate = d3.bisector(function(d) { return d.year; }).left;

        var x = d3.scaleTime().range([0, width]);
        var y = d3.scaleLinear().range([height, 0]);

        var line = d3.line()
            .x(function(d) { return x(d.year); })
            .y(function(d) { return y(d.value); });


        const data = [
            {"year" : "2005", "value": 771900},
            {"year" : "2006", "value": 771500},
            {"year" : "2007", "value": 770500},
            {"year" : "2008", "value": 770400},
            {"year" : "2009", "value": 771000},
            {"year" : "2010", "value": 772400},
            {"year" : "2011", "value": 774100},
            {"year" : "2012", "value": 776700},
            {"year" : "2013", "value": 777100},
            {"year" : "2014", "value": 779200},
            {"year" : "2015", "value": 782300}
        ];

        data.forEach(function(d) {
            d.year = parseTime(d.year);
            d.value = +d.value;
        });

        x.domain(d3.extent(data, function(d) { return d.year; }));
        y.domain([d3.min(data, function(d) { return d.value; }) / 1.005, d3.max(data, function(d) { return d.value; }) * 1.005]);

        console.log(transform);


        return (
            <svg width="960" height="500">
                <g transform={`translate(${margin.left},${margin.top})`}>
                    <g className="axis axis--x"
                       transform={`translate(0, ${height})`}
                       ref={node => d3.select(node).call(d3.axisBottom(x))}
                    />

                    <g className="axis axis--y"
                       ref={node => d3.select(node).call(d3.axisLeft(y).ticks(6).tickFormat(function(d) { return parseInt(d / 1000) + "k"; }))}
                    />

                    <path
                        className="line"
                        d={line(data)}
                    />

                    <g
                        className="focus"
                        transform={transform}
                        style={{...this.state}}
                    >
                        <line className="x-hover-line hover-line"
                              y1={-10}
                              y2={height}
                        />

                        {/*<line*/}
                            {/*className="y-hover-line hover-line"*/}
                            {/*x1={width}*/}
                            {/*x2={width}*/}
                        {/*/>*/}

                        {/*<circle*/}
                            {/*r={7.5}*/}
                        {/*/>*/}

                        <text
                            x={15}
                            dy=".31em"
                        />
                    </g>
                </g>

                <rect
                    transform={`translate(${margin.left},${margin.top})`}
                    className="overlay"
                    width={width}
                    height={height}
                    onMouseOver={() => {
                        this.setState({display: "block"})
                    }}
                    onMouseOut={() => {
                        this.setState({display: "block"})
                    }}
                    ref={node => this.node = node}
                    onMouseMove={(e) => {
                        var x0 = x.invert(e.clientX),
                            i = bisectDate(data, x0, 1),
                            d0 = data[i - 1],
                            d1 = data[i],
                            d = x0 - d0.year > d1.year - x0 ? d1 : d0;

                        console.log(d1);

                        this.setState({transform: "translate(" + x(d.year) + ",0)"})

                    }}
                />
            </svg>
        );
    }
}


