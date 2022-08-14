import { FC, ReactNode } from "react";

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
      className="collapse collapse-arrow border border-base-300 bg-base-100"
    >
      <input type="checkbox" defaultChecked={last} />

      <div className="collapse-title text-xl font-medium">{title}</div>
      <div className="collapse-content">{children}</div>
    </div>
  );
};

export default Collapse;
