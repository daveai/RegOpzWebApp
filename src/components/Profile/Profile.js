import React, { Component } from 'react';
import ProfileLeftPane from './ProfileLeft';
import ProfileRightPane from './ProfileRight';

class Profile extends Component {
    constructor(props) {
        super(props);
    }

    saveEditedData(userData, userLink) {
        console.log(userData);
        console.log(userLink);
    }

    render() {
        return (
            <div className="row">
                <div className="col-xs-12">
                    <div className="x_panel">
                        <div className="title">
                            <h2>User Profile</h2>
                        </div>
                        <div className="clearfix">
                        </div>
                    </div>
                    <div className="x_content">
                        <ProfileLeftPane
                            image="http://via.placeholder.com/350x350"
                            username="Ash Ketchum"
                            userLink="www.codepen.io/davidkpiano"
                            userData={[
                                {
                                    iconName: "map-marker",
                                    dataValue: "Address"
                                },
                                {
                                    iconName: "camera",
                                    dataValue: "Nikon D5300"
                                }
                            ]}
                            saveEditedData={this.saveEditedData}
                        />
                        <ProfileRightPane />
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;