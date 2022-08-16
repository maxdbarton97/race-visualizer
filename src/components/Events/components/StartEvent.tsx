import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Event } from "../../../types";

const StartEvent: FC<Event> = ({ message }) => (
  <div key={message} className="flex gap-2 items-center">
    <FontAwesomeIcon icon="flag-checkered" />
    <p>{message}</p>
  </div>
);

export default StartEvent;
