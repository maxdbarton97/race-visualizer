/* eslint-disable react/no-array-index-key */
import { ChangeEvent, FC } from "react";

type SliderProps = {
  value: number;
  laps: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Slider: FC<SliderProps> = ({ value = 1, laps, onChange }) => {
  return (
    <div className="flex flex-col w-full">
      <input
        data-testid="Slider--input"
        type="range"
        min="1"
        max={laps}
        value={value}
        className="range"
        step="1"
        onChange={onChange}
      />
      <div className="w-full flex justify-between text-xs px-2">
        {Array.from({ length: laps }).map((_, i) => (
          <div className="relative" key={i.toString()}>
            <div key={`lap-${i + 1}`}>|</div>
            {value === i + 1 && (
              <div
                className={`absolute whitespace-nowrap text-center ${
                  i.toString().length === 1 ? "-left-0.5" : "-left-1"
                } mt-2`}
              >
                {i + 1}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
