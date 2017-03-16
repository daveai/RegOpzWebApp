import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import EditBusinessRules from './EditBusinessRules';
import LinkageBusinessRules from './LinkageBusinessRules';
export default class RightSlidePanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type:"",
            style: {
                width: '0px',
                border:"none"
            },
            isClosed: true
        }
        this.edit = true;
        this.selectedData = {};
    }
    render() {
      console.log("Selected data on panel: ", this.selectedData);
        if (this.state.type == "edit"){
            return (
                <div className="RightSlidePanel" ref="rightSlidePanel" style={this.state.style}>
                  <EditBusinessRules />
                </div>
            )
        }
        return (
            <div className="RightSlidePanel" ref="rightSlidePanel" style={this.state.style}>
                <LinkageBusinessRules data={this.selectedData} />
            </div>
        )
    }
    toggleMe(type) {
        if (this.state.isClosed == true) {
            this.setState({
                type:type,
                style: {
                    width: '300px',
                    borderLeft: "1px solid #ebebeb",
                    borderRight: "1px solid #ebebeb",
                    borderTop: "1px solid #ebebeb"
                },
                isClosed: false
            })
        } else {
            this.setState({
                style: {
                    width: '0px',
                    border:"none"
                },
                isClosed: true
            })
        }

    }
    close(){
      this.setState({
          style: {
              width: '0px',
              border:"none"
          },
          isClosed: true
      })
    }
}
