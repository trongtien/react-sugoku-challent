import { memo, PropsWithChildren } from "react";

type Props = {
  className?: string;
  onActionClick?: () => void;
} & PropsWithChildren;

const ActionButton = memo(({ onActionClick, children, className }: Props) => {
  return (
    <button className={className} onClick={onActionClick}>
      {children}
    </button>
  );
});

export default ActionButton;
