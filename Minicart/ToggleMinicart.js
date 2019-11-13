import React from "react";

const ToggleMinicart = ({ children }) => {

  const toggleMinicart = () => {

    // Listen for the event.
    // elem.addEventListener('build', function (e) { /* ... */ }, false);

    // Dispatch the event.
    document.dispatchEvent(new Event('toggle-minicart'));
  };

  return (
    <button onClick={toggleMinicart}>
      {children}

      <style jsx>{`
        button {
          border: none;
          padding: 0;
          margin: 0;
          background: none;
        }
        button::-moz-focus-inner,
        input::-moz-focus-inner {
          border: 0;
          padding: 0;
        }
      `}</style>
    </button>
  );
};

export default ToggleMinicart;
