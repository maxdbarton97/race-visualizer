import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Event } from "../../../types";

const PitStop: FC<Event> = ({ message }) => (
  <div key={message} className=" flex gap-2 items-center">
    <FontAwesomeIcon icon="car" className="text-blue-400" />
    <p>{message}</p>
  </div>
);

export default PitStop;
