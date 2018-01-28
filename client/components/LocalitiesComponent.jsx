import React from 'react';
import validator from 'validator';

class LocalitiesComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            locality: '',
            touched: {
                locality: false
            }
        };

        this.handleOnChange = ::this.handleOnChange;
    };

    handleOnChange(e) {
        this.setState({ locality: e.target.value });
        this.props.handleOnChange(e);
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true },
        });
    }

    render() {
        const errors = validate(this.state.locality);

        const shouldMarkError = (field) => {
            return errors[field] && (this.state.touched[field]);
        };

        const localities = [this.props.defaultValue ? this.props.defaultValue : "Select", "Attard", "Balzan", "Birgu", "Birkirkara", "Birżebbuġa", "Bormla", "Dingli", "Fgura", "Furjana", "Gudja", "Għargħur", "Gżira", "Iklin", "Imdina", "Imqabba", "Imsida", "Imġarr", "Isla", "Kalkara", "Lija", "Luqa", "Marsa", "Marsaskala", "Marsaxlokk", "Mellieħa", "Mosta", "Naxxar", "Pembroke", "Pietà", "Qormi", "Qrendi", "Rabat", "Raħal Ġdid (Paola)", "San Pawl il-Bahar", "San Ġiljan", "San Ġwann", "Santa Luċija", "Santa Venera", "Siġġiewi", "Sliema", "Valletta", "Ħal Għaxaq", "Ħal Kirkop", "Ħal Safi", "Ħamrun", "Żabbar", "Żebbuġ", "Żejtun", "Imtarfa", "Swieqi", "Ta' Xbiex", "Xgħajra", "Tarxien", "Żurrieq"];

        return (
            <select name="locality" className={shouldMarkError('locality')?"inputStyle errorTextBox":"inputStyle"} onBlur={this.handleBlur('locality')} onChange={this.handleOnChange}>
                {
                    localities.map((e) => {
                                return <option key={e} value={e} >{e}</option>;
                            })
                }
            </select>
        );
    };

};



function validate(locality) {
    // true means invalid, so our conditions got reversed
    return {
        locality: validator.equals(locality, "Select"),
    };
}

//this makes it a container, rather than a dumb component.
export default LocalitiesComponent;
