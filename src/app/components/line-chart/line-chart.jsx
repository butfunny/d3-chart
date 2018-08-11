import React from "react";
import dataTSV from "./data";

export class LineChart extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const svgWidth = 960,
            svgHeight = 500;

        const margin = { top: 20, right: 80, bottom: 30, left: 50 },
            width = svgWidth - margin.left - margin.right,
            height = svgHeight - margin.top - margin.bottom;

        let parseTime = d3.timeParse("%d-%b-%y");

        let x = d3.scaleTime()
            .rangeRound([0, width]);

        let y = d3.scaleLinear()
            .rangeRound([height, 0]);

        let line = d3.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.close); });

        const data = d3.tsvParse(dataTSV, (d) => {
            d.date = parseTime(d.date);
            d.close = +d.close;
            return d;
        });

        x.domain(d3.extent(data, function(d) { return d.date; }));
        y.domain(d3.extent(data, function(d) { return d.close; }));


        function make_x_gridlines() {
            return d3.axisBottom(x)
                .ticks(5)
        }

        function make_y_gridlines() {
            return d3.axisLeft(y)
                .ticks(5)
        }

        let area = d3.area()
            .x(function(d) { return x(d.date); })
            .y0(height)
            .y1(function(d) { return y(d.close); });

        // svg.append("path")
        //     .data([data])
        //     .attr("class", "area")
        //     .attr("d", area);


        return (
            <svg
                width={svgWidth}
                height={svgHeight}
            >
                <path className="area"
                      d={area(data)}
                      strokeWidth={0}
                      transform={`translate(${margin.left}, ${margin.top})`}
                />

                <g transform={`translate(${margin.left}, ${margin.top})`}>
                    <g
                        className="axis axis--x"
                        transform={`translate(0, ${height})`}
                        ref={node => d3.select(node).call(d3.axisBottom(x))}
                    />
                    <g className="axis axis--y" ref={node => d3.select(node).call(d3.axisLeft(y))}>
                        <text transform="rotate(-90)" y="6" dy="0.71em" fill="#000">
                            Price ($)
                        </text>
                    </g>

                    <g className="grid"
                       transform={`translate(0, ${height})`}
                       ref={node => d3.select(node).call(make_x_gridlines().tickSize(-height).tickFormat(""))}
                    />

                    <g className="grid"
                       ref={node => d3.select(node).call(make_y_gridlines().tickSize(-width).tickFormat(""))}
                    />

                    <path
                        className="line"
                        d={line(data)}
                        fill="none"
                        stroke="steelblue"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="1.5"
                    />

                    { data.map((d, i) => (
                        <circle
                            onMouseEnter={() => {console.log(1111);}}
                            key={i}
                            r={3.5}
                            cx={x(d.date)}
                            cy={y(d.close)}
                        />
                    ))}
                </g>
            </svg>
        );
    }
}