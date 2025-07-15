import { EmptyIcon } from "@/icons";

const EmptyData = () => {
  return (
    <div className="flex items-center justify-center flex-col w-full py-4">
      <EmptyIcon />
      <p className="text-base mt-2 font-bold"></p>
    </div>
  );
};

export default EmptyData;
