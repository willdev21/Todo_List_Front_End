import React from "react";

function ChekBox({ checked, onCheckBoxChange }) {
  return (
    <div>
      <input type="checkbox" checked={checked} onChange={onCheckBoxChange} />
    </div>
  );
}

export default ChekBox;
