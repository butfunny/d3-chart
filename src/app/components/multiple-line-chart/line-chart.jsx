import React, {Fragment} from "react";
import ReactDOM from "react-dom";
import { scaleOrdinal, scaleLinear, scaleTime } from 'd3-scale';
import { tsvParse } from 'd3-dsv';
import { schemeCategory10 } from 'd3-scale-chromatic';
import { timeParse } from 'd3-time-format';
import { line as d3Line, curveBasis } from 'd3-shape';
import { min, max, extent } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';
import { select } from 'd3-selection';

import dataTsv from './data';

export class LineChart extends React.Component {

    constructor(props){
        super(props);

    }



    render() {
        const svgWidth = 960,
            svgHeight = 500;

        const margin = { top: 20, right: 80, bottom: 30, left: 50 },
            width = svgWidth - margin.left - margin.right,
            height = svgHeight - margin.top - margin.bottom;

        const parseTime = timeParse('%Y%m%d');

        const x = scaleTime().range([0, width]),
            y = scaleLinear().range([height, 0]),
            z = scaleOrdinal(schemeCategory10);

        const line = d3Line()
            .curve(curveBasis)
            .x(d => x(d.date))
            .y(d => y(d.temperature));

        const data = tsvParse(dataTsv, (d, _, columns) => {
            d.date = parseTime(d.date);
            for (let i = 1, n = columns.length, c; i < n; ++i)
                d[(c = columns[i])] = +d[c];
            return d;
        });

        const cities = data.columns.slice(1).map(id => {
            return {
                id,
                values: data.map(d => {
                    return { date: d.date, temperature: d[id] };
                }),
            };
        });

        x.domain(extent(data, d => d.date));

        y.domain([
            min(cities, c => min(c.values, d => d.temperature)),
            max(cities, c => max(c.values, d => d.temperature)),
        ]);

        z.domain(cities.map(c => c.id));


        return (
            <svg width={svgWidth} height={svgHeight}>
                <g transform={`translate(${margin.left}, ${margin.top})`}>
                    <g
                        className="axis axis--x"
                        transform={`translate(0, ${height})`}
                        ref={node => select(node).call(axisBottom(x))}
                    />
                    <g className="axis axis--y" ref={node => select(node).call(axisLeft(y))}>
                        <text transform="rotate(-90)" y="6" dy="0.71em" fill="#000">
                            Temperature, ºF
                        </text>
                    </g>
                    { cities.map(city => {
                        const [lastD] = city.values.slice(-1);
                        return (
                            <g className="city" key={city.id}>
                                <path
                                    className="line"
                                    d={line(city.values)}
                                    style={{ stroke: z(city.id) }}
                                />
                                <text
                                    transform={`translate(${x(lastD.date)}, ${y(lastD.temperature)})`}
                                    x={3}
                                    dy="0.35em"
                                    style={{ font: '10px sans-serif' }}
                                >
                                    {city.id}
                                </text>
                            </g>
                        );
                    })}
                </g>
            </svg>
        );
    }
}



