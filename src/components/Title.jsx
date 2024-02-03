import React from "react";

const Title = ({ heading, para }) => {
  return (
    <div className="flex w-full flex-wrap mx-[20px] mb-4 capitalize">
      <h1 className="font-bold text-lg">{heading}</h1>
      <p className="lg:pl-6 lg:w-2/3 mx-auto leading-relaxed text-base">
        {para}
      </p>
    </div>
  );
};

export default Title;
