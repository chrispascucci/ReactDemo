import React from 'react';
import jQuery from 'jquery';

import StudentForm from './student-form';
import Student from './student';

export default class StudentBox extends React.Component {

  constructor() {
    super();

    this.state = {
      isEditMode: false,
      showStudents: false,
      students: [],
      updateStudentId: 0
    };

    this._addNewStudent = this._addNewStudent.bind(this);
    this._addStudent = this._addStudent.bind(this);
    this._cancelEdit = this._cancelEdit.bind(this);
    this._deleteStudent = this._deleteStudent.bind(this);
    this._updateStudent = this._updateStudent.bind(this);
  }

  componentWillMount() {
    this._fetchStudents();
  }

  render() {
    let students;
    if (this.state.isEditMode) {
      if (this.state.updateStudentId != 0) {
      students = this._getStudentToUpdate(this.state.updateStudentId);
      } else {
        students = <StudentForm 
                        addStudent={this._addStudent}
                        cancelEdit={this._cancelEdit} />;
      }
      return(
        <div className="row students-container">
          <div className="cell">
            <h2>Update Student</h2>
            <div className="student-box">
              {students}
            </div>
          </div>
        </div>
      );
    } else {
      students = this._getStudents();
      return(
        <div className="row students-container">
          <div className="cell">
            <h2>Current Enrollment</h2>
            <button type="button" onClick={this._addNewStudent}>
              Add New Student
            </button>
            <div className="student-box">
              <h3 className="student-count">{this._getStudentsTitle(students.length)}</h3>
              <div className="student-list">
                {students}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  _getStudents() {
    return this.state.students.map((student) => {
      return <Student
               {...student}
               onDelete={this._deleteStudent}
               onUpdate={this._updateStudent}
               key={student.id} />
    });
  }

  _getStudentsTitle(studentCount) {
    if (studentCount === 0) {
      return 'No students yet';
    } else if (studentCount === 1) {
      return '1 student';
    } else {
      return `${studentCount} students`;
    }
  }

  _getStudentToUpdate() {
    const student = this.state.students.filter(
      student => student.id === this.state.updateStudentId
    );
    return <StudentForm 
              {...student[0]}
              addStudent={this._addStudent}
              cancelEdit={this._cancelEdit} />;
  }

  _cancelEdit() {
    this.setState({
      isEditMode: false
    });
  }
  _addNewStudent() {
    this.setState({
      isEditMode: true,
      updateStudentId: 0
    });
  }
  _addStudent(studentId, studentName, studentGraduationYear, studentGpa, studentMajor) {
    this.setState({
      isEditMode: !this.state.isEditMode
    });
    console.log(studentId);
    if (studentId !== 0) {
      const studentList = this.state.students;
      for (var i in studentList) {
        if (studentList[i].id == studentId) {
          studentList[i].name = studentName;
          studentList[i].graduationYear = studentGraduationYear;
          studentList[i].gpa = studentGpa;
          studentList[i].major = studentMajor;
          break;
        }
      }
      this.setState({
        students: studentList
      });
    } else {
      const student = {
        id: this.state.students.length + 1,
        name: studentName,
        graduationYear: studentGraduationYear,
        gpa: studentGpa,
        major: studentMajor
      };
      
      this.setState({
        students: this.state.students.concat([student])
      });
    }
  }

  _fetchStudents() {
    jQuery.ajax({
      method: 'GET',
      url: this.props.apiUrl,
      success: (students) => {
        this.setState({ students })
      }
    });
  }

  _updateStudent(studentId) {
    this.setState({
      isEditMode: !this.state.isEditMode,
      updateStudentId: studentId
    });
  }

  _deleteStudent(studentID) {
    const students = this.state.students.filter(
      student => student.id !== studentID
    );

    this.setState({ students });
  }

}

StudentBox.propTypes = {
  apiUrl: React.PropTypes.string.isRequired
}