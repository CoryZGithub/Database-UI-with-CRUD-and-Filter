import React, { useEffect, useContext, useState } from "react";
import GymFinder from "../apis/GymFinder";
import { GymContext } from "../context/GymContext";
import { useNavigate } from "react-router-dom";

const EmployeeList = (props) => {
  let i = 0;
  const [q, setQ] = useState("");
  const { employees, setEmployees } = useContext(GymContext);
  let navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("CHELLO");
        
        const response = await GymFinder.get("/employees");
        console.log(response);
        // to lines be  low are to get rid of warning errors.
        setEmployees(response.data.data.employee);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  function search(rows) {
    return employees.filter(
      (row) =>
        row.employeefname.toLowerCase().indexOf(q) > -1 ||
        row.employeelname.toLowerCase().indexOf(q) > -1 ||
        row.employeeid.toString().toLowerCase().indexOf(q) > -1 ||
        row.worksat.toLowerCase().indexOf(q) > -1
    );
  }

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      await GymFinder.delete(`/${id}`);
      setEmployees(
        employees.filter((user) => {
          return user.membershipid !== id;
        })
      );
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className='list-group'>
      <div>
        Filter
        <input type='text' value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <table className='table table-hover table-dark '>
        <thead>
          <tr className='bg-primary'>
            <th scope='col'>Name</th>
            <th scope='col'>ID</th>
            <th scope='col'>Location</th>
          </tr>
        </thead>
        <tbody>
          {employees &&
            search(employees).map((employee) => {
              i++;
              return (
                <tr
                  // onClick={() => navigate(`/employee/${employee.membershipid}`)}
                  key={employee.employeefname + employee.employeelname + i}
                >
                  <td>
                    {employee.employeefname + " " + employee.employeelname}
                  </td>
                  {/* <td>{employee.customerlname}</td> */}
                  <td>{employee.employeeid}</td>
                  <td>{employee.worksat}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};


export default EmployeeList;
