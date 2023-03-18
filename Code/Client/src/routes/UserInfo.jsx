import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import GymFinder from "../apis/GymFinder";
import { GymContext } from "../context/GymContext";

const UserInfo = () => {
  const { id } = useParams();
  const { selectedMember, setSelectedMember } = useContext(GymContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GymFinder.get(`/${id}`);

        setSelectedMember(response.data.data.customer);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return <div>{selectedMember && selectedMember.customerfname}</div>;
};

export default UserInfo;
