import React from "react";
import {MultipleLineChart} from "./components/multiple-line-chart/multiple-line-chart";
import {LineChart} from "./components/line-chart/line-chart";
import {DonutChart} from "./components/donut-chart/donut-chart";
import {BarChart} from "./components/bar-chart/bar-chart";
export class AppMain extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="app-main">
                {/*<BarChart />*/}
                {/*<DonutChart />*/}
                {/*<MultipleLineChart/>*/}
                <LineChart />

                {/*<TooltipChart />*/}
            </div>
        );
    }
}