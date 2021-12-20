import { NextPage } from "next";
import React from "react";
import Calendar from "../components/Calendar";

const HomePage: NextPage = () => {
  return (
    <div>
      <Calendar weeks={2} />
    </div>
  );
};

export default HomePage;
