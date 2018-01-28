import React from 'react';
import LocalitiesComponent from '../components/LocalitiesComponent.jsx';

class ComplaintsSortComponent extends React.Component {
    constructor() {
        super();

        this.state = {
            locality: '',
            ordering: 'desc',
            limit: 10
        };

        this.handleOnChange = ::this.handleOnChange;
    }


    handleOnChange(e) {
        var name = e.target.name;
        this.setState({ name: e.target.value });
        this.props.handleOnChange(e);
    }

    render() {

        return (
            <div>
                <div className="overallDv"> 
                 <div className="rowArea" >
                    Sort:
                    <select name="ordering"  onChange={this.handleOnChange}>
                        <option key="desc" value="desc">Recent first</option>  
                        <option key="asc" value="asc">Oldest first</option>
                    </select>
                    Locality:<LocalitiesComponent name="locality" handleOnChange={this.handleOnChange} defaultValue="All" />
                    Show:
                    <select name="limit"  onChange={this.handleOnChange}>
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
