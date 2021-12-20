import { NextPage } from "next";
import React from "react";
import DayGrid from "../components/DayGrid";

const GridPage: NextPage = () => {
  return (
    <div>
      <DayGrid weeks={2} height={80} />
    </div>
  );
};

export default GridPage;
