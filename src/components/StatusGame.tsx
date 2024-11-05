import { memo } from "react";
import classNames from "classnames";
import useBored from "../hooks/useBored";

const StatusGame = memo(() => {
  const statusGame = useBored((state) => state.statusGameSection);

  return (
    <p className={classNames("w-full border border-1 px-3 py-1 text-center")}>
      {statusGame}
    </p>
  );
});

export default StatusGame;
