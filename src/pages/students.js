import React from 'react';
import StudentBox from '../components/student-box';

export default class StudentsPage extends React.Component {
  render() {
    return (
      <div>
        <div className="cell">
          <article className="article">
            <h1 className="article-title">Student Management System</h1>
            <StudentBox apiUrl="api/students/students.json" />
          </article>
        </div>
      </div>
    )
  }
}
