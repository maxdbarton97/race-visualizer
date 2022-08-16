import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Event } from "../../../types";

const FastestLap: FC<Event> = ({ message }) => (
  <div key={message} className="flex flex-row gap-2 items-center">
    <FontAwesomeIcon icon="stopwatch" className="text-purple-400" />
    <span>{message}</span>
  </div>
);

export default FastestLap;
