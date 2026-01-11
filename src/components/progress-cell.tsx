import { css } from "@emotion/react";
import styled from "@emotion/styled";

const CELL_STATUS = {
  NOT_SEEN: "notSeen",
  IN_PROGRESS: "inProgress",
  MOSTLY_FAILED: "mostlyFailed",
} as const;

type CellStatus = (typeof CELL_STATUS)[keyof typeof CELL_STATUS];

const CELL_VARIANT = {
  CELL_NORMAL_SIZE: "cell-normal-size",
  CELL_SMALL_SIZE: "cell-small-size",
} as const;

type CellVariant = (typeof CELL_VARIANT)[keyof typeof CELL_VARIANT];

type Props = {
  label: string;
  status: CellStatus;
  variant: CellVariant;
};

const StyledCell = styled.div<{
  variant: CellVariant;
  bgColor: string;
}>(({ variant, bgColor }) => {
  const cellSize = {
    [CELL_VARIANT.CELL_NORMAL_SIZE]: 24,
    [CELL_VARIANT.CELL_SMALL_SIZE]: 16,
  };

  const cellBorderRadius = {
    [CELL_VARIANT.CELL_NORMAL_SIZE]: 3,
    [CELL_VARIANT.CELL_SMALL_SIZE]: 2,
  };

  return css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${cellSize[variant]}px;
    height: ${cellSize[variant]}px;
    border-radius: ${cellBorderRadius[variant]}px;
    background-color: ${bgColor};
  `;
});

const getBackgroundColor = (status: CellStatus): string => {
  switch (status) {
    case CELL_STATUS.NOT_SEEN:
      return "var(--color-grey)";
    case CELL_STATUS.MOSTLY_FAILED:
      return "var(--color-red)";
    case CELL_STATUS.IN_PROGRESS:
      return "var(--color-green)";
    default:
      return "var(--color-grey)";
  }
};

function ProgressCell({
  label,
  status,
  variant = CELL_VARIANT.CELL_NORMAL_SIZE,
}: Props): React.ReactNode {
  const backgroundColor = getBackgroundColor(status);

  return (
    <StyledCell
      aria-label={label}
      variant={variant}
      bgColor={backgroundColor}
    />
  );
}

export default ProgressCell;
