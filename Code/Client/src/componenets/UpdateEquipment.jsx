import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import GymFinder from "../apis/GymFinder";
import { useNavigate } from "react-router-dom";
const UpdateMember = () => {
  const { id, two, three } = useParams();
  const [equipID, setequipID] = useState("");
  const [subscriptiontype, setSubscriptiontype] = useState("");
  const [hasequipment, setHasEquipment] = useState("");

  let navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const response = await GymFinder.get(`/equipment/${id}/${two}/${three}`);
      setequipID(response.data.data.customer.customerfname);
      setSubscriptiontype(response.data.data.customer.customerlname);
      setHasEquipment(response.data.data.customer.memberat);
      console.log(response);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedMember = await GymFinder.put(`/equipment/${id}/${two}/${three}`, {
      equipid: equipID,
      subscriptiontype,
      hasequipment
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
        {/* EQUIP ID */}
        <div className='form-group'>
          <label htmlFor='equipID'>Equip ID</label>
          <input
            value={equipID}
            onChange={(e) => setequipID(e.target.value)}
            id='equipID'
            className='form-control'
            type='text'
          />
        </div>
        {/* subscriptiontype */}
        <div className='form-group'>
          <label htmlFor='subscriptiontype'>subscriptiontype</label>
          <input
            value={subscriptiontype}
            onChange={(e) => setSubscriptiontype(e.target.value)}
            id='subscriptiontype'
            className='form-control'
            type='text'
          />
        </div>
        {/* hasequipment  */}
        <div className='form-group'>
          <label htmlFor='hasequipment'>hasequipment</label>
          <input
            value={hasequipment}
            onChange={(e) => setHasEquipment(e.target.value)}
            id='hasequipment'
            className='form-control'
            type='text'
          />
        </div>
        
        {/* LOCATION */}
        <div>
          <button type='submit' onClick={twoFuncs} className='btn btn-primary'>
            submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateMember;
