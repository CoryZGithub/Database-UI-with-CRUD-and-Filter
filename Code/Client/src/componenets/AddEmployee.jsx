import React from "react";
import { useContext } from "react";
import { useState } from "react";
import GymFinder from "../apis/GymFinder";
import { GymContext } from "../context/GymContext";
import "react-datepicker/dist/react-datepicker.css";

const AddMember = () => {
  const { addEmployee } = useContext(GymContext);
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [userID, setUserID] = useState("");
  const [memAt, setMemAt] = useState("");
  const [IsManager, setIsManager] = useState("");
  // setUserID(Math.floor(Math.random()*10000000));
  //setBDate("1998/06/12")

  const randomNum = () => {
    let e = 1000005;
    while (e < 10000000) {
      e = Math.floor(Math.random() * 100000000);
    }

    return e;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUserID(randomNum());
    try {
      const response = await GymFinder.post("/employee", {
        employeefname: fName,
        employeelname: lName,
        istrainer: IsManager,
        worksat: memAt,
        employeeid: userID,
      });
      addEmployee(response.data.data.customer);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    // const [membership, setMembership] = useState("")
    <div className='mb-4'>
      Add Employee
      <form action=''>
        <div className='row gy-2 gx-3 align-items-center'>
          <div className='col-auto'>
            <input
              value={fName}
              onChange={(e) => setFName(e.target.value)}
              type='text'
              className='form-control'
              placeholder='First Name'
            />
          </div>
          <div className='col-auto'>
            <input
              value={lName}
              onChange={(e) => setLName(e.target.value)}
              type='text'
              className='form-control'
              placeholder='Last Name'
            />
          </div>

          {/*  VV Subscription Plan VV  */}

          <div className='col-auto'>
            <select
              onChange={(e) => setIsManager(e.target.value)}
              className='custom-select my-1 mr-sm-2'
            >
              <option selected disabled>
                Is Manager?
              </option>
              <option value='True'>True</option>
              <option value={"False"}>False</option>
            </select>
          </div>
        </div>
        <div className='row gy-2 gx-3 align-items-center'>
          {/*  VV Location VV  */}
          <div className='col-auto'>
            <select
              onChange={(e) => setMemAt(e.target.value)}
              className='custom-select my-1 mr-sm-2'
            >
              <option selected disabled defaultValue='0'>
                Location
              </option>
              <option value='4473349916'>4473349916</option>
              <option value='3998678923'>3998678923</option>
            </select>
          </div>
          <div className='col-auto'>
            <button
              onClick={handleSubmit}
              type='submit'
              className='btn btn-primary'
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddMember;
