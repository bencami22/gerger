import React from 'react';
import ComplaintViewComponent from './ComplaintViewComponent.jsx';
import { connect } from 'react-redux';
import { complaints } from '../reducers/reducer-complaints';

import { bindActionCreators } from 'redux';
import { setSortComplaints } from '../actions/action-sortComplaints';

import ComplaintsSortComponent from '../components/ComplaintsSortComponent.jsx';

class ComplaintsViewComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            locality: '',
            ordering: 'desc',
            limit: 10
        };

        this.handleOnChange = ::this.handleOnChange;
    }

    handleOnChange(e) {
        this.setState({
                [e.target.name]: e.target.value
            },
            function() {
                var sortComplaintsSettings = {
                    ordering: this.state.ordering,
                    locality: this.state.locality,
                    limit: parseInt(this.state.limit)
                };
                this.props.setSortComplaints(sortComplaintsSettings);
                this.props.socketConnection.emit('GetComplaints', sortComplaintsSettings);
            });
    }

    render() {

        return (
            <div>{
                this.props.complaints &&
                <div>
                    <ComplaintsSortComponent handleOnChange={this.handleOnChange}  /> 
                    <dl> {
                          this.props.complaints.map((x, i) =>
                            <ComplaintViewComponent key={i} author={x.author} avatarUrl={x.avatarUrl} title={x.title} content={x.content} locality={x.locality} anon={x.anon} dtTimestamp={x.dtTimestamp} fileUrls={x.fileUrls} />
                        )
                    } 
                    </dl>
                </div>}
            </div>
        )
    };

};


//passes state into component as a prop
function mapStateToProps(state) {
    return {
        complaints: state.complaints,
        socketConnection: state.socketConnection
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setSortComplaints: setSortComplaints }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ComplaintsViewComponent);
