import React from 'react';
import ComplaintViewComponent from './ComplaintViewComponent.jsx';
import { connect } from 'react-redux';
import { complaints } from '../reducers/reducer-complaints';

class ComplaintsViewComponent extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <dl>
                {this.props.complaints && this.props.complaints.map((x, i)=>
                    <ComplaintViewComponent key={i} author={x.author} title={x.title} content={x.content} />
                )}
            </dl>
        );
    };

};

//passes state into component as a prop
function mapStateToProps(state) {
    return {
        complaints: state.complaints
    }
}

export default connect(mapStateToProps)(ComplaintsViewComponent);
