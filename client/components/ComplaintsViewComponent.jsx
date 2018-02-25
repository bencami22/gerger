import React from 'react';
import ComplaintViewComponent from './ComplaintViewComponent.jsx';
import { connect } from 'react-redux';
import { complaints } from '../reducers/reducer-complaints';
import { sortComplaints } from '../reducers/reducer-sortComplaints';

import { bindActionCreators } from 'redux';
import { setSortComplaints } from '../actions/action-sortComplaints';

import ComplaintsSortComponent from '../components/ComplaintsSortComponent.jsx';
import NoAccessComponent from '../components/NoAccessComponent.jsx';

class ComplaintsViewComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            locality: this.props.sortComplaints ? this.props.sortComplaints.locality : '',
            ordering: this.props.sortComplaints ? this.props.sortComplaints.ordering : 'desc',
            limit: this.props.sortComplaints ? this.props.sortComplaints.limit : 10
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
            <div>{(!this.props.activeUser || !this.props.activeUser._id) ? <NoAccessComponent /> :
                this.props.complaints ?
                <div>
                    <ComplaintsSortComponent handleOnChange={this.handleOnChange} ordering={this.state.ordering} locality={this.state.locality} limit={this.state.limit}   /> 
                    <dl> {
                          this.props.complaints && this.props.complaints.map((x, i) =>
                            <ComplaintViewComponent key={i} author={x.author} avatarUrl={x.avatarUrl} title={x.title} content={x.content} locality={x.locality} anon={x.anon} dtTimestamp={x.dtTimestamp} fileUrls={x.fileUrls} />
                        )
                    } 
                    </dl>
                </div>
                :(!this.props.complaints || this.props.complaints.length==0) &&
                 <div>
                 <p>
                    No results found. Tweak your filters!
                 </p>
                 </div>}
            </div>
        )
    };

};


//passes state into component as a prop
function mapStateToProps(state) {
    return {
        complaints: state.complaints,
        socketConnection: state.socketConnection,
        sortComplaints: state.sortComplaints,
        activeUser: state.activeUser
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setSortComplaints: setSortComplaints }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ComplaintsViewComponent);
