import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import SelectPopover from "react-select-popover";
require ('../../../node_modules/react-select-popover/dist/select-popover.css');
export default class Permissions extends Component {
    constructor(props) {
    	super(props);
    }
    render(){
    	var options = [
		    { label: "CSS", value: "css" },
		    { label: "HTML", value: "html" },
		    { label: "JavaScript", value: "js" },
		    { label: "Ruby on Rails", value: "ror" },
		];
		var selectFieldName = "my-select";
		var selectPlaceholder = "Choose some options...";
		var onChange = function(obj) {
		    console.log("EVENT", obj.event); // "added" or "removed"
		    console.log("ITEM", obj.item);   // item that has been added/removed { label: '...', value: '...' }
		    console.log("VALUE", obj.value); // [{label: '...', value: '...'}, {label: '...', value: '...'}]
		}
    	return(
    		<div>
    			<h1>Permissions</h1>
    			<SelectPopover 
			        options={options} 
			        name={selectFieldName} 
			        selectPlaceholder={selectPlaceholder}  
			        onChange={ onChange }
			    />
			    <SelectPopover 
			        options={options} 
			        name={selectFieldName} 
			        selectPlaceholder={selectPlaceholder}  
			        onChange={ onChange }
			    />
			    <button>Assign</button>
    		</div>
    	)
    }
}