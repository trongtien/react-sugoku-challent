import { memo, PropsWithChildren } from "react";

type Props = {
  className?: string;
  onActionClick?: () => void;
  isDisabled?: boolean;
} & PropsWithChildren;

const ActionButton = memo(
  ({ onActionClick, children, className, isDisabled = false }: Props) => {
    return (
      <button
        className={className}
        onClick={onActionClick}
        disabled={isDisabled}
      >
        {children}
      </button>
    );
  },
);

export default ActionButton;
