import React from "react";

type IPInputProps = {
  value: string;
  onChange: (val: string) => void;
  className?: string;
  inputClassName?: string;
  required?: boolean;
};

const IPInput: React.FC<IPInputProps> = ({
  value,
  className,
  required,
  inputClassName,
  onChange,
}) => {
  const ipParts = value.split(".");
  while (ipParts.length < 4) ipParts.push("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const val = e.target.value;
    if (!/^\d*$/.test(val)) return;

    const newParts = [...ipParts];
    newParts[index] = val.slice(0, 3);
    onChange(newParts.join("."));
  };

  return (
    <div className={`py-4 px-10 flex flex-row gap-2 ${className}`}>
      {ipParts.map((part, i) => (
        <input
          key={i}
          type="text"
          inputMode="numeric"
          maxLength={3}
          value={part}
          onChange={(e) => handleChange(e, i)}
          className={`bg-white h-full w-1/5 border border-black border-solid p-2 text-center ${inputClassName}`}
          required={required}
        />
      ))}
    </div>
  );
};

export default IPInput;
