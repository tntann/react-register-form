/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import useClickOutSide from "../../hooks/useClickOutSide";
import { useWatch } from "react-hook-form";

const dataJob = [
  {
    id: 1,
    value: "front-end intern",
    text: "Front-end Intern",
  },
  {
    id: 2,
    value: "back-end intern",
    text: "Back-end Intern",
  },
  {
    id: 3,
    value: "fullstack developer",
    text: "Fullstack Developer",
  },
];

const Dropdown = ({
  control,
  setValue,
  name,
  // dataJob,
  dropdownLabel = "Select your job",
}) => {
  const { show, setShow, nodeRef } = useClickOutSide();
  const dropdownValue = useWatch({
    control,
    name: "job",
    defaultValue: "",
  });
  console.log("🚀 ~ dropdownValue:", dropdownValue);
  const handleClickDropdownItem = (e) => {
    setValue(name, e.target.dataset.value);
    setShow(false);
    setLabel(e.target.textContent);
  };
  const [label, setLabel] = useState(dropdownLabel);

  useEffect(() => {
    if (dropdownValue === "") setLabel(dropdownLabel);
  }, [dropdownValue]);
  return (
    <div className="relative" ref={nodeRef}>
      <div
        className="p-5 border border-gray-100 rounded-lg bg-white flex items-center justify-between cursor-pointer"
        onClick={() => setShow(!show)}
      >
        <span>{label}</span>
      </div>
      <div
        className={`absolute top-full left-0 w-full bg-white rounded-lg cursor-pointer ${
          show ? "" : " opacity-0 invisible"
        }`}
      >
        {dataJob.map((item) => (
          <div
            className="p-5 hover:bg-gray-100"
            onClick={handleClickDropdownItem}
            data-value={item?.value}
            key={item.id}
          >
            {item?.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
