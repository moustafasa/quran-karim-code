import React from "react";
import "./ContextMenu.scss";

// const showContextMenu = (e) => {
//   e.preventDefault();
//   setContextShow(true);
//   const right = window.innerWidth - e.pageX + "px";
//   const left = window.innerWidth - Number.parseFloat(right) + "px";
//   const top = e.pageY + "px";
//   if (Number.parseFloat(right) < Number.parseFloat(left))
//     setContextPosition({ right, top });
//   else setContextPosition({ left, top });
// };

const ContextMenu = ({ options = [], position }) => {
  return (
    <ul className="context-menu" style={position}>
      {options.map((opt, key) => (
        <li
          key={key}
          onClick={opt.handler}
          className={opt.disabled ? "disabled" : ""}
        >
          {opt.text}
        </li>
      ))}
    </ul>
  );
};

export default ContextMenu;
