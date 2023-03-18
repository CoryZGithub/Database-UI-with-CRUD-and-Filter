import React, { useState, createContext } from "react";

export const GymContext = createContext();

export const GymContextProvider = (props) => {
  const [gym, setGym] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [mainLocation, setMainLocation] = useState([]);
  const [employees, setEmployees] = useState([]);

  const addMember = (gyms) => {
    setGym([...gym, gyms]);
  };

  const addEmployee = (employeesman) => {
    setEmployees([...employees, employeesman])
  }
  const addLocation = (mainLocations) => {
    setMainLocation([...mainLocation, mainLocations]);
  };

  return (
    <GymContext.Provider
      value={{
        gym,
        setGym,
        addMember,
        selectedMember,
        setSelectedMember,
        mainLocation,
        setMainLocation,
        addLocation,
        employees,
        setEmployees,
        addEmployee
      }}
    >
      {props.children}
    </GymContext.Provider>
  );
};
