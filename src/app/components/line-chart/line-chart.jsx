import React, {Fragment} from "react";
import dataTSV from "./data";

export class LineChart extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const svgWidth = 960,
            svgHeight = 500;

        const margin = {top: 20, right: 80, bottom: 30, left: 50},
            width = svgWidth - margin.left - margin.right,
            height = svgHeight - margin.top - margin.bottom;

        let parseTime = d3.timeParse("%d-%b-%y");

        let x = d3.scaleTime()
            .rangeRound([0, width]);

        let y = d3.scaleLinear()
            .rangeRound([height, 0]);

        let line = d3.line()
            .x(function (d) {
                return x(d.date);
            })
            .y(function (d) {
                return y(d.close);
            });

        const data = d3.tsvParse(dataTSV, (d) => {
            d.date = parseTime(d.date);
            d.close = +d.close;
            return d;
        });

        x.domain(d3.extent(data, function (d) {
            return d.date;
        }));
        y.domain(d3.extent(data, function (d) {
            return d.close;
        }));


        let area = d3.area()
            .x(function (d) {
                return x(d.date);
            })
            .y0(height)
            .y1(function (d) {
                return y(d.close);
            });


        // svg.append("linearGradient")
        //     .attr("id", "area-gradient")
        //     .attr("gradientUnits", "userSpaceOnUse")
        //     .attr("x1", 0).attr("y1", y(0))
        //     .attr("x2", 0).attr("y2", y(1000))
        //     .selectAll("stop")
        //     .data([
        //         {offset: "0%", color: "rgba(68, 138, 255, 0.05)"},
        //         {offset: "100%", color: "#448aff"}
        //     ])
        //     .enter().append("stop")
        //     .attr("offset", function(d) { return d.offset; })
        //     .attr("stop-color", function(d) { return d.color; });


        return (
            <svg
                width={svgWidth}
                height={svgHeight}
            >

                <linearGradient id="area-gradient" gradientUnits="userSpaceOnUse"
                                x1="100%" y1="100%"
                >
                    <stop offset="0%" stopColor="rgba(68, 138, 255, 0.05)"/>
                    <stop offset="100%" stopColor="#448aff"/>

                </linearGradient>


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
                       ref={node => d3.select(node).call(d3.axisBottom(x).ticks(5).tickSize(-height).tickFormat(""))}
                    />

                    <g className="grid"
                       ref={node => d3.select(node).call(d3.axisLeft(y).ticks(5).tickSize(-width).tickFormat(""))}
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

                </g>
            </svg>
        );
    }
}