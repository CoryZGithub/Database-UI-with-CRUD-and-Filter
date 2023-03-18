import React, { useEffect, useContext, useState } from "react";
import GymFinder from "../apis/GymFinder";
import { GymContext } from "../context/GymContext";
import { useNavigate } from "react-router-dom";

const MemberList = (props) => {
  const [q, setQ] = useState("");
  const { gym, setGym } = useContext(GymContext);
  let navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GymFinder.get("/");
        // to lines be  low are to get rid of warning errors.
        setGym(response.data.data.customer);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  function search(rows) {
    return gym.filter(
      (row) =>
        row.customerfname.toLowerCase().indexOf(q) > -1 ||
        row.customerlname.toLowerCase().indexOf(q) > -1 ||
        row.membershipid.toString().toLowerCase().indexOf(q) > -1 ||
        row.subscriptionplan.toLowerCase().indexOf(q) > -1
    );
  }

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      await GymFinder.delete(`/${id}`);
      setGym(
        gym.filter((user) => {
          return user.membershipid !== id;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  //UPDATE USER FRONT END
  const handleUpdate = async (e, membershipid) => {
    e.stopPropagation();
    navigate(`/users/${membershipid}/update`);
  };

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
            <th scope='col'>Plan</th>
            <th scope='col'>Profile</th>
            <th scope='col'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {gym &&
            search(gym).map((user) => {
              return (
                <tr
                  // onClick={() => navigate(`/user/${user.membershipid}`)}
                  key={user.membershipid}
                >
                  <td>{user.customerfname + " " + user.customerlname}</td>
                  {/* <td>{user.customerlname}</td> */}
                  <td>{user.membershipid}</td>
                  <td>{user.subscriptionplan}</td>
                  <td>
                    <button
                      onClick={
                        (e) => handleUpdate(e, user.membershipid)
                        //navigate(`/users/${(e, user.membershipid)}/update`)
                      }
                      className='btn btn-warning'
                    >
                      Profile
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={(e) => handleDelete(e, user.membershipid)}
                      className='btn btn-danger'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default MemberList;
