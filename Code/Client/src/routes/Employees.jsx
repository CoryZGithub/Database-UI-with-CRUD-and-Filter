import React from 'react'
import EmployeeList from "../componenets/EmployeeList";
import Header from '../componenets/Header';
import AddEmployee from "../componenets/AddEmployee";
const Employees = () => {
  return (
    <div>
      <Header/>
      <AddEmployee/>
      <EmployeeList/>
    </div>
  );
}

export default Employees