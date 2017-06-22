import React from 'react';
import { Link } from 'react-router';

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <div className="top-menu">
          <ul>
            <li>
              <Link to="/students">Student Management System</Link>
            </li>
          </ul>
        </div>

        {this.props.children}
      </div>
    )
  }
}
