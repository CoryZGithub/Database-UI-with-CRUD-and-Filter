import React from "react";
import AddMember from "../componenets/AddMember";
import Header from "../componenets/Header";
import MemberList from "../componenets/MemberList";

const Home = () => {
  return (
    <div>
      <Header />
      <AddMember />
      <MemberList />
    </div>
  );
};

export default Home;
