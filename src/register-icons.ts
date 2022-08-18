import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFlagCheckered,
  faArrowUp,
  faArrowDown,
  faCar,
  faStopwatch,
  faFaceFrown,
} from "@fortawesome/free-solid-svg-icons";

const registerIcons = () => {
  library.add(
    faFlagCheckered,
    faArrowUp,
    faArrowDown,
    faCar,
    faStopwatch,
    faFaceFrown
  );
};

export default registerIcons;
