import React, { useState, createContext } from "react";
import { useEffect } from "react";
import GymFinder from "../apis/GymFinder";
export const AdminContext = createContext();

export const AdminContextProvider = (props) => {
  const [isAdmin, setIsAdmin] = useState();
  const [currentUser] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GymFinder.get("/employee");
        // to lines be  low are to get rid of warning errors.
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [currentUser]);

  return (
    <AdminContext.Provider value={{isAdmin, setIsAdmin}}>
      {props.children}
    </AdminContext.Provider>
  );
};
