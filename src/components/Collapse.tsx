import { Children, FC, ReactNode } from "react";

export type CollapseProps = {
  title: string;
  children: ReactNode;
  tabIndex: number;
  last: boolean;
};

const Collapse: FC<CollapseProps> = ({ title, children, tabIndex, last }) => {
  return (
    <div
      key={tabIndex}
      tabIndex={tabIndex}
      className={`collapse collapse-arrow border-base-300 bg-base-100border-b border-l border-r ${
        last ? "border-t" : ""
      }`}
    >
      <input type="checkbox" defaultChecked={last} />

      <div className="collapse-title text-xl font-medium">
        <span>{title}</span>
        <span className="text-gray-400 text-lg float-right">
          {Children.count(children)} Events
        </span>
      </div>
      <div className="collapse-content">{children}</div>
    </div>
  );
};

export default Collapse;
