import { memo } from "react";
import classNames from "classnames";
import useBoared from "../hooks/useBoared";

const StatusGame = memo(() => {
  const statusGame = useBoared((state) => state.statusGameSection);

  return (
    <p className={classNames("w-full border border-1 px-3 py-1 text-center")}>
      {statusGame}
    </p>
  );
});

export default StatusGame;
