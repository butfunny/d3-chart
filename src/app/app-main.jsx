import React from "react";
import {LineChart} from "./components/multiple-line-chart/line-chart";
export class AppMain extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="app-main">
                <LineChart

                />
            </div>
        );
    }
}