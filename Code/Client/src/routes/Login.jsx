import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GymFinder from "../apis/GymFinder";
import { AdminContext } from "../context/AdminContext";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [employeeID, setEmployeeID] = useState("");
  const { isAdmin, setIsAdmin } = useContext(AdminContext);
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      console.log("are we there");
      const response = await GymFinder.get("/employee", {
        params: {
          employeefname: firstName,
          employeelname: lastName,
          employeeid: employeeID,
        },
      });
      console.log(response);
      console.log(response.data.data.employee.rows[0].ismanager);
      return response.data.data.employee.rows[0].ismanager;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("whattsup");
    console.log("almost");
    const isOkay = await fetchData();
    console.log("Okay =", isOkay);
    if(isOkay){
      
      setIsAdmin(true);
      console.log(isAdmin);
      navigate(`/`); 
    } else {
      setIsAdmin(false);
      navigate(`/`);
    }
  };

  return (
    <div>
      <div> The Login Page</div>
      <div className='col-auto'>
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          type='text'
          className='form-control'
          placeholder='First Name'
        />
      </div>
      <div className='col-auto'>
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          type='text'
          className='form-control'
          placeholder='Last Name'
        />
      </div>
      <div className='col-auto'>
        <input
          value={employeeID}
          onChange={(e) => setEmployeeID(e.target.value)}
          type='text'
          className='form-control'
          placeholder='Employee ID'
        />
      </div>
      <div className='col-auto'>
        <button
          onClick={handleSubmit}
          type='submit'
          className='btn btn-primary'
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
