import './styles.css';
import { Component } from 'react/cjs/react.production.min';

export class InputSearch extends Component{
    render(){
        return(
            <input value={this.props.value} onChange={this.props.onChange} type="search" className="input" /> 
        );
    }
}