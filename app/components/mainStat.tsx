import React from "react";

const Statistics: React.FC = () => {
  return (
    <div className="flex flex-row items-left justify-between mt-3 bg-transparent">
      <div className="text-center">
        <span className="text-xl font-bold">240k+</span>
        <p>Anual Sales</p>
      </div>

      <div className="text-center">
        <span className="text-xl font-bold">100k+</span>
        <p>Reg. Users</p>
      </div>

      <div className="text-center">
        <span className="text-xl font-bold">50k+</span>
        <p>Users/month</p>
      </div>
    </div>
  );
};

export default Statistics;
