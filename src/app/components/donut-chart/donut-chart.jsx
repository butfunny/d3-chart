import React from "react";

export class DonutChart extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {

        let data = [
            {name: "USA", value: 40},
            {name: "UK", value: 20},
            {name: "Canada", value: 30},
            {name: "Maxico", value: 5},
            {name: "VietNam", value: 5},
        ];
        let text = "";

        let width = 260;
        let height = 260;
        let thickness = 50;


        let radius = Math.min(width, height) / 2;
        let color = d3.scaleOrdinal(d3.schemeCategory10);

        let arc = d3.arc()
            .innerRadius(radius - thickness)
            .outerRadius(radius);

        let pie = d3.pie()
            .value(function(d) { return d.value; })
            .sort(null);

        return (
            <svg
                className="pie"
                width={width}
                height={height}
            >
                <g transform={`translate(${width/2},${height/2})`}>
                    { pie(data).map((d, i) => (
                        <g
                            key={i}
                        >
                            <path
                                d={arc(d)}
                                fill={color(i)}
                            />

                        </g>
                    ))}

                    <text textAnchor="middle">
                        Hehe
                    </text>
                </g>

            </svg>
        );
    }
}