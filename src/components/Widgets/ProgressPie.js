import React, { Component } from 'react';
import {
    PieChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Label
} from 'recharts';

class ProgressPie extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [
                {
                    name: this.props.currentValueTag,
                    value: Math.round((this.props.currentValue * 100) / this.props.maxValue),
                    color: this.props.currentValueColor
                },
                {
                    name: this.props.maxValueTag,
                    value: Math.round((this.props.maxValue - this.props.currentValue) * 100 / this.props.maxValue),
                    color: this.props.maxValueColor
                }
            ]
        };
    }

    componentWillReceiveProps(nextProps) {
        let currentValue = nextProps.currentValue;
        let currentValueColor = nextProps.currentValueColor;
        let currentValueTag = nextProps.currentValueTag;
        let maxValue = nextProps.maxValue;
        let maxValueColor = nextProps.maxValueColor;
        let maxValueTag = nextProps.maxValueTag;

        this.setState({
            data: [
                {
                    name: currentValueTag,
                    value: Math.round((currentValue * 100) / maxValue),
                    color: currentValueColor
                },
                {
                    name: maxValueTag,
                    value: Math.round((maxValue - currentValue) * 100 / maxValue),
                    color: maxValueColor
                }
            ]
        })
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
                            <PieChart>
                                <Pie
                                    name={this.props.legend}
                                    data={this.state.data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={this.props.innerRadius}
                                    outerRadius={this.props.outerRadius}
                                    startAngle={90}
                                    endAngle={450}
                                >
                                    {
                                        this.state.data.map((element) => {
                                            return (
                                                <Cell fill={element.color} />
                                            );
                                        })
                                    }
                                    <Label value={this.state.data[0].value + '%'} position="center" />
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div >
            </div>
        );
    }
}

export default ProgressPie;