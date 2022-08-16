import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Event } from "../../../types";

const PositionGained: FC<Event> = ({ message }) => (
  <div key={message} className=" flex gap-2 items-center">
    <FontAwesomeIcon icon="arrow-up" className="text-green-400" />
    <p>{message}</p>
  </div>
);

export default PositionGained;
