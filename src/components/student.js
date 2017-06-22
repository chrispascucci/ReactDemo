import React from 'react';

import StudentConfirmation from './student-confirmation';

export default class Student extends React.Component {
  constructor() {
    super();

    this.state = {
      isAbusive: false
    };

    this._handleDelete = this._handleDelete.bind(this);
    this._handleUpdate = this._handleUpdate.bind(this);
  }

  render() {
    return(
      <div className="student">
        <p className="student-header">{this.props.name}</p>
        <p>Graduation Year: {this.props.graduationYear}</p>
        <p>GPA: {this.props.gpa}</p>
        <p>Major: {this.props.major}</p>
        <div className="student-actions">
          <StudentConfirmation onConfirm={this._handleDelete}>
            Delete
          </StudentConfirmation>

          <StudentConfirmation onConfirm={this._handleUpdate}>
            Update
          </StudentConfirmation>
        </div>
      </div>
    );
  }

  _handleDelete() {
    this.props.onDelete(this.props.id);
  }

  _handleUpdate() {
    this.props.onUpdate(this.props.id);
  }
}