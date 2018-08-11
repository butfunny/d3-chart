import React from "react";
import dataTSV from "./data";
export class BarChart extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let svgWidth = 960, svgHeight = 500,
            margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = svgWidth - margin.left - margin.right,
            height = svgHeight - margin.top - margin.bottom;


        let x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
            y = d3.scaleLinear().rangeRound([height, 0]);

        const data = d3.tsvParse(dataTSV, (d) => {
            d.frequency = +d.frequency;
            return d;
        });


        x.domain(data.map(function(d) { return d.letter; }));
        y.domain([0, d3.max(data, function(d) { return d.frequency; })]);


        return (
            <svg height={svgHeight} width={svgWidth}>
                <g transform={`translate(${margin.left},${margin.top})`}>
                    <g className="axis axis--x"
                       ref={node => d3.select(node).call(d3.axisBottom(x))}
                       transform={`translate(0, ${height})`}
                    />

                    <g className="axis axis--y"
                       ref={node => d3.select(node).call(d3.axisLeft(y).ticks(10, "%"))}
                    >
                        <text
                            textAnchor="end"
                            dy="0.71em"
                            y={6}
                            transform="rotate(-90)"
                            fill="black"
                        >
                            Frequency
                        </text>
                    </g>

                    { data.map((d, i) => (
                        <rect
                            x={x(d.letter)}
                            y={y(d.frequency)}
                            className="bar"
                            width={x.bandwidth()}
                            height={height - y(d.frequency)}
                            key={i} />
                    ))}
                </g>
            </svg>
        );
    }
}