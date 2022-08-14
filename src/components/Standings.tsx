import { FC, forwardRef } from "react";
import FlipMove from "react-flip-move";
import { Timing } from "../types";

type TableProps = {
  data: Timing[];
};

const getStyle = (pc: number | undefined): string => {
  const style = "text-white ";
  if (!pc) return "";
  return style + (pc > 0 ? "bg-green-700" : "bg-red-700");
};

const FunctionalRow = forwardRef<HTMLTableRowElement, Timing>(
  ({ positionChange, position, driverId, time }, ref) => (
    <tr ref={ref} key={driverId}>
      <td className={getStyle(positionChange)}>{position}</td>
      <td className={getStyle(positionChange)}>{driverId}</td>
      <td className={getStyle(positionChange)}>{time}</td>
      {positionChange && (
        <td className={getStyle(positionChange)}>
          {(positionChange < 0 ? "" : "+") + positionChange}
        </td>
      )}
    </tr>
  )
);

const Table: FC<TableProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Driver</th>
            <th>Time</th>
            <th>Pos. +/-</th>
          </tr>
        </thead>
        {/* https://github.com/joshwcomeau/react-flip-move/issues/273 */}
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <FlipMove typeName="tbody">
          {data.map((props) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <FunctionalRow {...props} key={props.driverId} />
          ))}
        </FlipMove>
      </table>
    </div>
  );
};

export default Table;
