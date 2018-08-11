import React from "react";
import {MultipleLineChart} from "./components/multiple-line-chart/multiple-line-chart";
import {LineChart} from "./components/line-chart/line-chart";
export class AppMain extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="app-main">
                <MultipleLineChart/>

                <LineChart />
            </div>
        );
    }
}