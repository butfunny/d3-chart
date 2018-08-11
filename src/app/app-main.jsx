import React from "react";
import {MultipleLineChart} from "./components/multiple-line-chart/multiple-line-chart";
import {LineChart} from "./components/line-chart/line-chart";
import {DonutChart} from "./components/donut-chart/donut-chart";
export class AppMain extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="app-main">
                <DonutChart />
                <MultipleLineChart/>
                <LineChart />
            </div>
        );
    }
}