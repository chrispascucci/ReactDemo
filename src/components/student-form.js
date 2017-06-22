import React from 'react';

export default class StudentForm extends React.Component {
  constructor() {
    super();
    this.state = {};
    this._handleCancel = this._handleCancel.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  render() {
    const cancelButton = (
            <button type="button" onClick={this._handleCancel}>
              Cancel
            </button> 
    );
    if (this.props.id) {
      return (
        <form className="student-form" onSubmit={this._handleSubmit}>
          <label>Update student</label>
          <div className="student-form-fields">
            <input placeholder="Name:" defaultValue={this.props.name} ref={c => this._name = c} />
            <input placeholder="Graduation Year:" defaultValue={this.props.graduationYear} ref={c => this._graduationYear = c} />
            <input placeholder="GPA:" defaultValue={this.props.gpa} ref={c => this._gpa = c} />
            <input placeholder="Major:" defaultValue={this.props.major} ref={c => this._major = c} />
          </div>
          <div className="student-form-actions">
            <button type="submit">
              Save changes
            </button>
            <button type="reset">
              Reset
            </button>
            {cancelButton}
          </div>
        </form>
      );
    } else {
      return (
        <form className="student-form" onSubmit={this._handleSubmit}>
          <label>New student</label>
          <div className="student-form-fields">
            <input placeholder="Name:" ref={c => this._name = c} />
            <input placeholder="Graduation Year:" ref={c => this._graduationYear = c} />
            <input placeholder="GPA:" ref={c => this._gpa = c} />
            <input placeholder="Major:" ref={c => this._major = c} />
          </div>
          <div className="student-form-actions">
            <button type="submit">
              Save student
            </button>
            <button type="reset">
              Reset
            </button>
            {cancelButton}
          </div>
        </form>
      );
    }
  }

  _handleSubmit(event) {
    event.preventDefault();

    const id = this.props.id ? this.props.id : 0;

    this.props.addStudent(
                  id,
                  this._name.value,
                  this._graduationYear.value,
                  this._gpa.value,
                  this._major.value);

    this._name.value = '';
    this._graduationYear.value = '';
    this._gpa.value = '';
    this._major.value = '';
  }

  _handleCancel(event) {
    event.preventDefault();
    this.props.cancelEdit();
  }
}