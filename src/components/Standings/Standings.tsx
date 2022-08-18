import { FC, forwardRef } from "react";
import FlipMove from "react-flip-move";
import { Timing } from "../../types";
import addSign from "../../utils/addSign";

type TableProps = {
  data: Timing[];
};

const getClasses = (r: Timing): string => {
  let style = "text-white ";
  if (r.newFastest) style += "bg-purple-700";
  else if (!r.positionChange) return "";
  else style += r.positionChange > 0 ? "bg-green-700" : "bg-red-700";
  return style;
};

const FunctionalRow = forwardRef<HTMLTableRowElement, Timing>((r, ref) => {
  const bg = getClasses(r);
  return (
    <tr ref={ref} key={r.driverId}>
      <td className={bg}>{r.position}</td>
      <td className={bg}>{r.driverName}</td>
      <td className={bg}>{r.time}</td>
      <td className={`${bg} relative`}>
        {r.positionChange ? <p>{addSign(r.positionChange)}</p> : <p>--</p>}
        {/* fastest label */}
        {r.currentFastest && <div className="fastest-label">BEST</div>}
      </td>
    </tr>
  );
});

const Table: FC<TableProps> = ({ data }) => {
  return (
    <table className="table w-full overflow-hidden">
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
      <FlipMove typeName="tbody" className="overflow-auto">
        {data
          .sort((a, b) => (a.position > b.position ? 1 : -1))
          .map((props) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <FunctionalRow {...props} key={props.driverId} />
          ))}
      </FlipMove>
    </table>
  );
};

export default Table;
