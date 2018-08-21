import React from 'react';
import { browserHistory, Router, Route, Link, withRouter } from 'react-router';
class Filter extends React.Component {
constructor(props) {
super(props);
this.onChange = this.onChange.bind(this);
}  
onChange(e) {
 this.props.setFilter(e.target.value) 
}
render() {
 return (
            <div className="searchInput">
                <input 
                  type="text" 
                  className="form-control"
                  placeholder="search" 
                  onChange={this.onChange}
                />
                <label htmlFor="search" className="icon icon-1202" rel="tooltip" title="search"></label>
              </div> 
 )
}
}
export default Filter;