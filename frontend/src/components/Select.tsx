import React from "react";

type Props = {
  options: { label?: string; value?: string }[];
  value?: string;
  placeHolder?: string;
  onChange?: (value: string) => void;
};

const Select = (props: Props) => {
  const { value, options, placeHolder, onChange } = props;

  return (
    <select
      className="border border-solid border-black px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      required
    >
      <option value="">{placeHolder}</option>
      {options?.map((item, index) => (
        <option value={item.value} key={index}>
          {item.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
