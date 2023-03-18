import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import GymFinder from "../apis/GymFinder";
import { useNavigate } from "react-router-dom";
const UpdateMember = () => {
  const { id } = useParams();
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  //const [userID, setUserID] = useState("");
  const [bDate, setBDate] = useState("");
  const [pWord, setPWord] = useState("");
  const [username, setUsername] = useState("");
  const [memAt, setMemAt] = useState("");
  const [subPlan, setSubPlan] = useState("");
  const [isTrainer, setIsTrainer] = useState("");
  let navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const response = await GymFinder.get(`/${id}`);
      setFName(response.data.data.customer.customerfname);
      setLName(response.data.data.customer.customerlname);
      //setUserID(response.data.data.customer.userid);
      setMemAt(response.data.data.customer.memberat)
      setBDate(response.data.data.customer.birthdate);
      setUsername(response.data.data.customer.username);
      setPWord(response.data.data.customer.password);
      setSubPlan(response.data.data.customer.subscriptionplan);
      console.log(response);
    };
    fetchData();
    const hasTrainerFunction = async () => {
      const trainerIs = await GymFinder.get(`/hastrainer/${id}`);
      setIsTrainer(trainerIs.data.data.hastrainer.employeeid ||"null")
      console.log("hi there a");
      console.log(trainerIs);
    };
    fetchData();
    hasTrainerFunction();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedMember = await GymFinder.put(`/${id}`, {
      customerfname: fname,
      customerlname: lname,
      customerid: id,
      memberat: memAt,
      subscriptionplan: subPlan,
      birthdate: bDate,
      username,
      password: pWord,
    });
    console.log(updatedMember);
  };

  const twoFuncs = (e) => {
    handleSubmit(e);
    navigate(`/`);
  };

  return (
    <div>
      <form action=''>
        {/* FIRST NAME */}
        <div className='form-group'>
          <label htmlFor='fName'>First Name</label>
          <input
            value={fname}
            onChange={(e) => setFName(e.target.value)}
            id='fName'
            className='form-control'
            type='text'
          />
        </div>
        {/* LAST NAME */}
        <div className='form-group'>
          <label htmlFor='lName'>Last Name</label>
          <input
            value={lname}
            onChange={(e) => setLName(e.target.value)}
            id='lName'
            className='form-control'
            type='text'
          />
        </div>
        {/* USERNAME  */}
        <div className='form-group'>
          <label htmlFor='username'>Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id='username'
            className='form-control'
            type='text'
          />
        </div>
        {/* PASSWORD */}
        <div className='form-group'>
          <label htmlFor='pWord'>Password</label>
          <input
            value={pWord}
            onChange={(e) => setPWord(e.target.value)}
            id='pWord'
            className='form-control'
            type='text'
          />
        </div>

        {/* LOCATION */}
        <div>
          <label htmlFor='pWord'>Location</label>
          <div className='form-group'>
            <select
              onChange={(e) => setMemAt(e.target.value)}
              className='custom-select my-1 mr-sm-2'
            >
              <option selected disabled>
                {memAt}
              </option>
              <option value='4473349916'>4473349916</option>
              <option value='3998678923'>3998678923</option>
            </select>
          </div>

          {/* SUBSCRIPTION PLAN  */}
          <div>
            <label htmlFor='pWord'>Subscription Plan</label>
            <div className='form-group'>
              <select
                onChange={(e) => setSubPlan(e.target.value)}
                className='custom-select my-1 mr-sm-2'
              >
                <option selected disabled>
                  {subPlan}
                </option>
                <option value='Bronze'>Bronze</option>
                <option value='Silver'>Silver</option>
                <option value='Gold'>Gold</option>
              </select>
            </div>
          </div>
          {/* HASTRAINER */}
          <div className='form-group'>
            <label htmlFor='isTrainer'>Fellow Trainer</label>
            <input
              value={isTrainer}
              onChange={(e) => setIsTrainer(e.target.value)}
              id='hasequipment'
              className='form-control'
              type='text'
            />
          </div>
          <button type='submit' onClick={twoFuncs} className='btn btn-primary'>
            submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateMember;
