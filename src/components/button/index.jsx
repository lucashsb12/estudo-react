import './styles.css';
import { Component } from 'react/cjs/react.production.min';

export class Button extends Component{
    render(){
        const {textButton, onClick, disabled} = this.props;
        return (
            <button 
                className="button" 
                onClick={onClick}
                disabled={disabled}
            >
                {textButton}
            </button>
        )
    }
}