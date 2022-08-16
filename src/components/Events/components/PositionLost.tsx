import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Event } from "../../../types";

const PositionLost: FC<Event> = ({ message }) => (
  <div key={message} className="flex gap-2 items-center">
    <FontAwesomeIcon icon="arrow-down" className="text-red-400" />
    <p>{message}</p>
  </div>
);

export default PositionLost;
