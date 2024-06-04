import React, { useState } from 'react';

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  const onClickTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <ul className="tabs">
        {children.map((child) => {
          const { label } = child.props;

          return (
            <li key={label} onClick={() => onClickTab(label)} className={label === activeTab ? 'active' : ''}>
              {label}
            </li>
          );
        })}
      </ul>
      <div className="tab-content">
        {children.map((child) => {
          if (child.props.label !== activeTab) return undefined;
          return child.props.children;
        })}
      </div>
    </div>
  );
};

export default Tabs;
