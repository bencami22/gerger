import React from 'react';


class LocalitiesComponent extends React.Component {
    constructor(props) {
        super(props);

        this.handleOnChange = ::this.handleOnChange;
    };

    handleOnChange(e) {
        this.props.handleChange(e.target.name, e.target.value);
    }

    render() {
        const localities = ["Attard", "Balzan", "Birgu", "Birkirkara", "Birżebbuġa", "Bormla", "Dingli", "Fgura", "Furjana", "Gudja", "Għargħur", "Gżira", "Iklin", "Imdina", "Imqabba", "Imsida", "Imġarr", "Isla", "Kalkara", "Lija", "Luqa", "Marsa", "Marsaskala", "Marsaxlokk", "Mellieħa", "Mosta", "Naxxar", "Pembroke", "Pietà", "Qormi", "Qrendi", "Rabat", "Raħal Ġdid (Paola)", "San Pawl il-Bahar", "San Ġiljan", "San Ġwann", "Santa Luċija", "Santa Venera", "Siġġiewi", "Sliema", "Valletta", "Ħal Għaxaq", "Ħal Kirkop", "Ħal Safi", "Ħamrun", "Żabbar", "Żebbuġ", "Żejtun", "Imtarfa", "Swieqi", "Ta' Xbiex", "Xgħajra", "Tarxien", "Żurrieq"];

        return (
            <select name="locality" className="inputStyle" onChange={this.handleOnChange}>
                {
                    localities.map((e) => {
                                return <option key={e} value={e} >{e}</option>;
                            })
                }
            </select>
        );
    };

};

//this makes it a container, rather than a dumb component.
export default LocalitiesComponent;
