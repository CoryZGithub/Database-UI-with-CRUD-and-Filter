import React, { useEffect, useContext, useState } from "react";
import GymFinder from "../apis/GymFinder";
import { GymContext } from "../context/GymContext";
import { useNavigate } from "react-router-dom";

let i = 0;
const MemberList = (props) => {
  const { mainLocation, setMainLocation } = useContext(GymContext);
  const [q, setQ] = useState("");
  let navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GymFinder.get("/location/select");

        console.log(response);
        setMainLocation(response.data.data.amenities);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  function search(rows) {
    return mainLocation.filter(
      (row) =>
        row.equipname.toLowerCase().indexOf(q) > -1 ||
        row.hasequipment.toString().toLowerCase().indexOf(q) > -1 ||
        row.equipid.toString().toLowerCase().indexOf(q) > -1 ||
        row.subscriptiontype.toLowerCase().indexOf(q) > -1
    );
  }

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      await GymFinder.delete(`/${id}`);
      setMainLocation(
        mainLocation.filter((user) => {
          return user.membershipid !== id;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  //UPDATE USER FRONT END
  const handleUpdate = async (e, user) => {
    e.stopPropagation();
    navigate(
      `/equipment/${user.equipid}/${user.subscriptiontype}/${user.hasequipment}`
    );
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
            <th scope='col'>Equipment Name</th>
            <th scope='col'>equipID</th>
            <th scope='col'>Required Plan</th>
            <th scope='col'>Location</th>
            <th scope='col'>Details</th>

            {/* <th scope='col'>Remove</th> */}
          </tr>
        </thead>
        <tbody>
          {mainLocation &&
            search(mainLocation).map((user) => {
              i++;
              return (
                <tr
                  // onClick={() => navigate(`/user/${user.membershipid}`)}
                  key={user.equipname + i}
                >
                  <td>{user.equipname}</td>
                  {/* <td>{user.customerlname}</td> */}
                  <td>{user.equipid}</td>
                  <td>{user.subscriptiontype}</td>
                  <td>{user.hasequipment}</td>
                  <td>
                    <button
                      onClick={
                        (e) => handleUpdate(e, user)
                        //navigate(`/users/${(e, user.membershipid)}/update`)
                      }
                      className='btn btn-warning'
                    >
                      Details
                    </button>
                  </td>
                  {/* <td>
                    <button
                      onClick={(e) => handleDelete(e, user.membershipid)}
                      className='btn btn-danger'
                    >
                      Delete
                    </button>
                  </td> */}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default MemberList;
