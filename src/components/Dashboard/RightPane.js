import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CountTile from './../Widgets/CountTile';
export default class RightPane extends Component {
  render() {
    return (

      <div className="row tile_count">
        <CountTile
          iconName="user"
          titleText="Number of reports"
          countValue="2500"
          changeColor="green"
          sortOrder="asc"
          changePercentage="4"
          descText="From Last Week"
        />
        <CountTile
          iconName="clock-o"
          titleText="Average Time"
          countValue="123.50"
          changeColor="green"
          sortOrder="asc"
          changePercentage="34"
          descText="From Last Week"
        />
        <CountTile
          iconName="user"
          titleText="Data Feeds"
          countValue="2,500"
          countColor="green"
          changeColor="green"
          sortOrder="asc"
          changePercentage="34"
          descText="From Last Week"
        />
        <CountTile
          iconName="user"
          titleText="Number of Errors"
          countValue="4,567"
          changeColor="red"
          sortOrder="desc"
          changePercentage="12"
          descText="From Last Week"
        />
        <CountTile
          iconName="user"
          titleText="Adjustments"
          countValue="2,315"
          changeColor="green"
          sortOrder="asc"
          changePercentage="34"
          descText="From Last Week"
        />
        <CountTile
          iconName="user"
          titleText="Business Rules"
          countValue="7,325"
          changeColor="green"
          sortOrder="asc"
          changePercentage="34"
          descText="From Last Week"
        />
      </div>
    )
  }
}
