import { Fragment, memo, useCallback } from "react";
import useBoared from "../hooks/useBoared";
import ColBoared from "./ColBored";

const Boared = () => {
  const boaredColumn = useBoared((state) => state.boared);
  const boaredStore = useBoared();

  const handleChangeCol = useCallback(
    (rowIndex: number, colIndex: number, val: number) => {
      return boaredStore.updateValueCol(rowIndex, colIndex, val);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  console.log("vored", boaredColumn);

  return (
    <div className="h-96 w-96 grid grid-cols-9 border-2 border-black">
      {boaredColumn?.map((row: number[], rowIndex: number) => {
        return (
          <Fragment key={`${rowIndex}-row`}>
            {row?.map((col: number, colIndex: number) => (
              <ColBoared
                key={`${rowIndex}-${colIndex}`}
                colIndex={colIndex}
                rowIndex={rowIndex}
                value={col}
                onChangeVal={handleChangeCol}
              />
            ))}
          </Fragment>
        );
      })}
    </div>
  );
};

export default memo(Boared);
