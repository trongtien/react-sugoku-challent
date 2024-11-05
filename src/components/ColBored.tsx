import classNames from "classnames";
import { memo } from "react";

type Props = {
  rowIndex: number;
  colIndex: number;
  value?: number;
  onChangeVal?: (rowIndex: number, colIndex: number, val: number) => void;
};

const ColBoared = memo(({ colIndex, rowIndex, value, onChangeVal }: Props) => {
  const handleChange = (val?: string | number | null) => {
    const result = val === null || !val ? 0 : +val;
    return onChangeVal && onChangeVal(rowIndex, colIndex, result);
  };

  return (
    <input
      key={colIndex}
      type="number"
      className={classNames(
        "border border-black bg-white text-center font-mono w-full h-full text-2xl",
        {
          ["border-b-2"]: rowIndex === 2 || rowIndex === 5,
          ["border-r-2"]: colIndex === 2 || colIndex === 5,
        },
      )}
      value={value === 0 ? "" : value}
      onChange={(event) => handleChange(event.target.value)}
      min={0}
      max={9}
    />
  );
});

export default ColBoared;
