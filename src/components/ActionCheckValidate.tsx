import { memo } from "react";

type Props = {
  onCheckValidate: () => void;
};

const ActionCheckValidate = memo(({ onCheckValidate }: Props) => {
  return (
    <button className="border border-1 px-3 py-1" onClick={onCheckValidate}>
      Check
    </button>
  );
});

export default ActionCheckValidate;
