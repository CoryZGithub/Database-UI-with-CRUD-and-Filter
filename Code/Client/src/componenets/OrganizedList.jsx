import React, { useEffect, useContext } from "react";
import GymFinder from "../apis/GymFinder";
import { GymContext } from "../context/GymContext";
import { useNavigate } from "react-router-dom";



const OrganizedList = (props) => {
  let i = 0;
    const { mainLocation, setMainLocation } = useContext(GymContext);
    let navigate = useNavigate();
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await GymFinder.get("/location/select");

          console.log(response);
          // to lines below are to get rid of warning errors.
          setMainLocation(response.data.data.amenities);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }, []);

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
    const handleUpdate = async (e, membershipid) => {
      e.stopPropagation();
      navigate(`/users/${membershipid}/update`);
    };

    return (
      <div className='list-group'>
        <table className='table table-hover table-dark '>
          <thead>
            <tr className='bg-primary'>
              <th scope='col'>Equipment Name</th>
              <th scope='col'>equipID</th>
              <th scope='col'>Required Plan</th>
              <th scope='col'>Location</th>
              <th scope='col'>Details</th>

              <th scope='col'>Remove</th>
            </tr>
          </thead>
          <tbody>
            {mainLocation &&
              mainLocation.map((user) => {
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
                          (e) => handleUpdate(e, user.membershipid)
                          //navigate(`/users/${(e, user.membershipid)}/update`)
                        }
                        className='btn btn-warning'
                      >
                        Details
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


export default OrganizedList



