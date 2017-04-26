import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import TreeView from 'react-treeview'
require('./ViewDataComponentStyle.css');
require('../../../node_modules/react-treeview/react-treeview.css');
class ViewDataComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      drawerHandleStyle:{
        display:"block"
      }
    }
    this.state = {
      menuPanelStyle:{
        width:"0px"
      }
    }
    this.isMenuPanelOpen = false;
    this.dataSource = [
      {
        type: 'Employees',
        collapsed: false,
        people: [
          {name: 'Paul Gordon', age: 25, sex: 'male', role: 'coder', collapsed: false},
          {name: 'Sarah Lee', age: 23, sex: 'female', role: 'jqueryer', collapsed: false},
        ],
      },
      {
        type: 'CEO',
        collapsed: false,
        people: [
          {name: 'Drew Anderson', age: 35, sex: 'male', role: 'boss', collapsed: false},
        ],
      },
    ];
  }
  render(){
    return (
      <div
        onMouseMove={
          (event) => {
            /*if(event.clientX < 350){
              this.setState({
                drawerHandleStyle:{
                  display:'block'
                }
              });
            } else {
              this.setState({
                drawerHandleStyle:{
                  display:'none'
                }
              });
            }*/
          }
        }
        className="view_data_dummy_area"
      >
        <div className="view_data_menu_panel_holder">
          <div
            className="view_data_menu_panel"
            style={this.state.menuPanelStyle}
          >

          <div>
           {this.dataSource.map((node, i) => {
             const type = node.type;
             const label = <span className="node">{type}</span>;
             return (
               <TreeView key={type + '|' + i} nodeLabel={label} defaultCollapsed={false}>
                 {node.people.map(person => {
                   const label2 = <span className="node">{person.name}</span>;
                   return (
                     <TreeView nodeLabel={label2} key={person.name} defaultCollapsed={false}>
                       <div className="info">age: {person.age}</div>
                       <div className="info">sex: {person.sex}</div>
                       <div className="info">role: {person.role}</div>
                     </TreeView>
                   );
                 })}
               </TreeView>
             );
           })}
         </div>

          </div>
          <div className="view_data_drawer_handle_default"
            style={this.state.drawerHandleStyle}
            onClick={
              (event) => {
                this.isMenuPanelOpen = ~this.isMenuPanelOpen
                if(this.isMenuPanelOpen){
                  this.setState(
                    {
                      menuPanelStyle:{
                        width:"360px"
                      }
                    }
                  );
                } else {
                  this.setState(
                    {
                      menuPanelStyle:{
                        width:"0px"
                      }
                    }
                  );
                }

              }
            }
          >
          </div>
        </div>
      </div>
    )
  }
}
export default ViewDataComponent;
