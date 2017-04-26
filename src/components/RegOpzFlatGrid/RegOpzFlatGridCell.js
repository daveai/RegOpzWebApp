import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ModalAlert from '../ModalAlert/ModalAlert';
export default class RegOpzFlatGridCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.data[props.identifier],
        }
        this.inputElem = null;
        this.editingValue = null;
    }
    componentWillReceiveProps(newProps){
        /*this.setState ({
            value: newProps.data[newProps.identifier],
        })*/
        this.state = {
            value: newProps.data[newProps.identifier],
        }
    }
    render() {

        return (
            <div className="flat_grid_row_cell">
                <span onClick={this.handleCellClick.bind(this)}>
                    {(this.state.value != null) ? this.state.value.toString().substring(0,30) : ""}
                </span>
                  <ModalAlert ref="modalAlert" showDiscard={true} onClickOkay={this.handleAlertOkayClick.bind(this)} onClickDiscard={this.handleAlertDiscardClick.bind(this)} />
            </div>
        )
    }
    handleCellClick(event) {
        this.editingValue = this.state.value;
        console.log("The editing data (data,identifier,id)", this.props.data[this.props.identifier], this.props.identifier,this.props.data['id']);
        this.inputElem = document.createElement("input");
        this.inputElem.value = this.state.value;
        this.inputElem.addEventListener('change', this.handleChange.bind(this), false);
        this.inputElem.addEventListener('blur', this.handleBlur.bind(this), false);
        event.target.appendChild(this.inputElem);
        this.inputElem.focus();
        $(".flat_grid_row_container").removeClass('flat_grid_row_container_active');
        $(event.target).parent().parent(".flat_grid_row_container").addClass('flat_grid_row_container_active');
    }
    handleChange(event){
        this.setState({
            value:event.target.value
        });
        this.props.data[this.props.identifier] = event.target.value;

    }
    handleBlur(event){
        $(".flat_grid_row_container").removeClass('flat_grid_row_container_active');
        if(this.editingValue != event.target.value){
          this.refs.modalAlert.open("Do you want to change \"" +  this.editingValue + "\" to \"" + event.target.value + "\" ?");
        }
        $(event.target).remove();
    }
    handleAlertOkayClick(){
      this.props.onUpdateRow(this.props.data)
    }
    handleAlertDiscardClick(){
      this.setState({
          value:this.editingValue
      });
    }

}
