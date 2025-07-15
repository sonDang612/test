/* eslint-disable @next/next/no-img-element */
import { DeleteIcon } from "../icons";

interface Props {
  onDetailsPress?: () => void;
  onDeletePress?: () => void;
}
const Actions = (props: Props) => {
  const { onDetailsPress, onDeletePress } = props;

  return (
    <div className="flex flex-row gap-3 items-center justify-center">
      {onDetailsPress && (
        <div onClick={onDetailsPress} className="cursor-pointer">
          <img
            src="/assets/images/details.png"
            alt="details"
            className="size-6"
          />
        </div>
      )}
      {onDeletePress && (
        <div className="cursor-pointer" onClick={onDeletePress}>
          <DeleteIcon fontSize={18} />
        </div>
      )}
    </div>
  );
};

export default Actions;
