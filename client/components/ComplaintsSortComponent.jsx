import React from 'react';
import LocalitiesComponent from '../components/LocalitiesComponent.jsx';

class ComplaintsSortComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            locality: this.props.locality ? this.props.locality : '',
            ordering: this.props.ordering ? this.props.ordering : 'desc',
            limit: this.props.limit ? this.props.limit : 10
        };

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
                    Locality:<LocalitiesComponent name="locality" handleOnChange={this.handleOnChange} initialValue="All" value={this.state.locality} />
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


export default ComplaintsSortComponent;
