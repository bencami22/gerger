import React from 'react';
import validator from 'validator';

class SelectComponent extends React.Component {
    constructor(props) {
        super(props);
        var options = this.props.options;
        if (!options) {
            options = [];
        }

        options.unshift(this.props.initialValue ? this.props.initialValue : "Select")

        this.state = {
            options: options,
            selectedOption: '',
            touched: {
                selectedOption: false
            }
        };

        this.handleOnChange = ::this.handleOnChange;
    };

    handleOnChange(e) {
        this.setState({ selectedOption: e.target.value });
        this.props.handleOnChange(e);
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true },
        });
    }

    render() {

        const errors = validate(this.state.selectedOption);

        const shouldMarkError = (field) => {
            return errors[field] && (this.state.touched[field]);
        };


        return (
            <select name="selectComp" className={shouldMarkError('selectedOption')?"inputStyle errorTextBox":"inputStyle"} onBlur={this.handleBlur('selectedOption')} onChange={this.handleOnChange} value={this.props.value}>
                {
                   this.state.options.map((e) => {
                                return <option key={e} value={e} >{e}</option>;
                            })
                }
            </select>
        );
    };

};



function validate(selectedOption) {
    // true means invalid, so our conditions got reversed
    return {
        selectedOption: validator.equals(selectedOption, "Select"),
    };
}

//this makes it a container, rather than a dumb component.
export default SelectComponent;
