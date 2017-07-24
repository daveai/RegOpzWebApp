import React, { Component } from 'react';
import {
    BarChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Bar,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

class BarChartWidget extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="tile_count">
                <div className="tile_stats_count">
                    <span className="count_top">
                        <i className={'fa fa-' + this.props.iconName}></i>
                        {" " + this.props.titleText}
                    </span>
                    <div className={'count ' + (this.props.countColor ? this.props.countColor : '')}>
                        {this.props.countValue}
                    </div>
                    <div className="count_bottom">
                        <ResponsiveContainer height={this.props.height} width={this.props.width}>
                            <BarChart data={this.props.data}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                {
                                    this.props.displayGrid &&
                                    <CartesianGrid strokeDasharray="3 3" />
                                }
                                {
                                    this.props.showTooltip &&
                                    <Tooltip />
                                }
                                {
                                    this.props.showLegend &&
                                    <Legend />
                                }
                                <Bar
                                    name={this.props.legend}
                                    dataKey="value"
                                    fill={this.props.barColor}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div >
            </div>
        );
    }
}

export default BarChartWidget;