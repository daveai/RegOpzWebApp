import React, { Component } from 'react';
import { FormControl } from 'react-bootstrap';

class ProfileLeftPane extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editUser: false,
            userData: this.props.userData,
            userLink: this.props.userLink
        };

        this.enableEditing = this.enableEditing.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.saveEditedData = this.saveEditedData.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            editUser: false,
            userData: nextProps.userData,
            userLink: nextProps.userLink
        });
    }

    enableEditing() {
        this.setState({
            editUser: true
        });
    }

    saveEditedData() {
        this.setState({ editUser: false });
        this.props.saveEditedData(this.state.userData, this.state.userLink);
    }

    handleChange(event, typeOfValue, index) {
        let value = event.target.value;
        switch (typeOfValue) {
            case 'INDEX':
                let userData = this.state.userData;
                userData[index].dataValue = value;
                this.setState({ userData: userData });
                break;
            case 'USER_LINK':
                this.setState({ userLink: value });
                break;
        }
    }

    render() {
        return (
            <div className="col-md-3 col-sm-3 col-xs-12 profile_left">
                <div className="profile_img">
                    <img className="img-responsive" src={this.props.image} alt="Avatar Image" />
                </div>
                <h3>{this.props.username}</h3>
                {
                    !this.state.editUser &&
                    <div>
                        <ul className="list-unstyled user_data">
                            {
                                this.state.userData.map(element => {
                                    return (
                                        <li>
                                            <i className={'fa fa-' + element.iconName}></i>
                                            {' ' + element.dataValue}
                                        </li>
                                    );
                                })
                            }
                            <li>
                                <i className="fa fa-external-link"></i>
                                <a href={'http://' + this.state.userLink} target="_blank">
                                    {' ' + this.state.userLink}
                                </a>
                            </li>
                        </ul>
                        <button className="btn btn-success" onClick={this.enableEditing}>
                            <i className="fa fa-edit"></i>
                            {' '} Edit Profile
                        </button>
                    </div>
                }
                {
                    this.state.editUser &&
                    <div>
                        <ul className="list-unstyled user_data">
                            {
                                this.state.userData.map((element, index) => {
                                    return (
                                        <li>
                                            <form>
                                                <FormControl
                                                    type="text"
                                                    placeholder="Enter text"
                                                    value={element.dataValue}
                                                    onChange={(event) => {
                                                        this.handleChange(event, 'INDEX', index);
                                                    }}
                                                />
                                            </form>
                                        </li>
                                    )
                                })
                            }
                            <li>
                                <form>
                                    <FormControl
                                        type="url"
                                        placeholder="Enter URL"
                                        value={this.state.userLink}
                                        onChange={(event) => {
                                            this.handleChange(event, 'USER_LINK');
                                        }}
                                    />
                                </form>
                            </li>
                        </ul>
                        <button className="btn btn-success" onClick={this.saveEditedData}>
                            <i className="fa fa-save"></i>
                            {' '} Save Profile
                        </button>
                    </div>
                }
            </div>
        );
    }
}

export default ProfileLeftPane;