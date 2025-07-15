import React, { useRef } from "react";
import { toast } from "react-toastify";

type Props = {
  onChange: (value: any) => void;
  renderButton: ({ onClick }: { onClick: () => void }) => React.JSX.Element;
};

const UploadExcel = (props: Props) => {
  const { onChange, renderButton } = props;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = async (e: any) => {
    const selectedFile = e.target.files[0];

    if (selectedFile && selectedFile.name.endsWith(".xlsx")) {
      onChange(selectedFile);
    } else {
      toast.warn(".xlsx");
    }
  };

  const onClick = () => {
    fileInputRef?.current?.click();
  };

  return (
    <div>
      <input
        type="file"
        accept=".xlsx"
        onChange={handleChange}
        className="hidden"
        ref={fileInputRef}
      />

      {renderButton({ onClick })}
    </div>
  );
};

export default UploadExcel;
