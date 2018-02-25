import React from 'react';

class NoAccessComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>You need to login to view this page.</div>
        );
    }
}

//A dumb component.
export default NoAccessComponent;
