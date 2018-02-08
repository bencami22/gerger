import React from 'react';
import { connect } from 'react-redux';
import { localities } from '../reducers/reducer-localities';

import SelectComponent from '../components/SelectComponent.jsx';

class ComplaintsSortComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            localities: this.props.localities.map((l) => l.Locality),
            locality: this.props.locality ? this.props.locality : '',
            ordering: this.props.ordering ? this.props.ordering : 'desc',
            limit: this.props.limit ? this.props.limit : 10
        };

        var dtyudd = this.state.localities;

        this.handleOnChange = ::this.handleOnChange;
    }


    handleOnChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
        this.props.handleOnChange(e);
    }

    render() {

        return (
            <div>
                <div className="overallDv"> 
                 <div className="rowArea" >
                    Sort:
                    <select name="ordering" onChange={this.handleOnChange} value={this.state.ordering}>
                        <option key="desc" value="desc">Recent first</option>
                        <option key="asc" value="asc">Oldest first</option>
                    </select>
                    Locality:<SelectComponent options={this.state.localities} name="locality" handleOnChange={this.handleOnChange} initialValue="All" value={this.state.locality} />
                    Show:
                    <select name="limit"  onChange={this.handleOnChange} value={this.state.limit}>
                        <option key="10" value="10">10</option> 
                        <option key="50" value="50">50</option>  
                        <option key="100" value="100">100</option>  
                    </select>
             </div></div>
            </div>
        );
    }

}

//passes state into component as a prop
function mapStateToProps(state) {
    return {
        localities: state.localities
    }
}

//this makes it a container, rather than a dumb component.
export default connect(mapStateToProps)(ComplaintsSortComponent);
