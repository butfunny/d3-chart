import React from "react";
import dataTSV from "./data";
import { scaleOrdinal, scaleLinear, scaleTime } from 'd3-scale';
import { tsvParse } from 'd3-dsv';
import { schemeCategory10 } from 'd3-scale-chromatic';
import { line as d3Line, curveBasis } from 'd3-shape';
import { min, max, extent } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';
import { select } from 'd3-selection';

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

        const data = tsvParse(dataTSV, (d) => {
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

        return (
            <svg
                width={svgWidth}
                height={svgHeight}
            >
                <g transform={`translate(${margin.left}, ${margin.top})`}>
                    <g
                        className="axis axis--x"
                        transform={`translate(0, ${height})`}
                        ref={node => select(node).call(axisBottom(x))}
                    />
                    <g className="axis axis--y" ref={node => select(node).call(axisLeft(y))}>
                        <text transform="rotate(-90)" y="6" dy="0.71em" fill="#000">
                            Price ($)
                        </text>
                    </g>

                    <g className="grid"
                       transform={`translate(0, ${height})`}
                       ref={node => select(node).call(make_x_gridlines().tickSize(-height).tickFormat(""))}
                    />

                    <g className="grid"
                       ref={node => select(node).call(make_y_gridlines().tickSize(-width).tickFormat(""))}
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