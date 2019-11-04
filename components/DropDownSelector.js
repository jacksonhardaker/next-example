import React, { useState, useEffect, useRef } from "react";

const DropDownSelector = ({ selectedValue, onChange, selectOptions, isDisabled, labelFromValue }) => {
  const [isMobile, setIsMobile] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(selectOptions.indexOf(selectedValue) || 0);
  const triggerBtnEl = useRef(null);

  const desktopToggle = val => setIsActive(val === undefined ? !isActive : val);

  const clickToClose = event => !event.target.dataset.preventClose && desktopToggle(false);

  useEffect(() => {

    isActive && document.addEventListener("click", clickToClose);

    return () => {
      document.removeEventListener("click", clickToClose);
    };
  }, [isActive, clickToClose]);

  useEffect(() => {
    onChange(selectOptions[selectedIndex]);
  }, [selectedIndex, selectOptions, onChange]);

  useEffect(() => {
    import("../utils/watch-mobile").then(module => {
      const watchMobile = module.default;
      setIsMobile(watchMobile(mobileWatcher => setIsMobile(mobileWatcher.matches)));
    })

    return () => {}
  }, [setIsMobile]);

  const change = event => setSelectedIndex(event.target.selectedIndex);

  const toggleDesktopDropdown = () => desktopToggle(!isActive);

  const desktopOptionClick = ({ target }) => {
    setSelectedIndex(selectOptions.indexOf(target.value));
    desktopToggle(false);
  };

  const renderDesktopDropdownOptions = () => {
    return isActive ? (
      <ul className="DropDownSelector__list">
        {selectOptions.map((option, index) =>
          <li className="DropDownSelector__list-item" key={index}>
            <button
              data-testid="drop-down-option-btn"
              type="button"
              className="DropDownSelector__list-btn"
              value={option}
              disabled={isDisabled ? isDisabled(option) : false}
              onClick={desktopOptionClick}
              data-prevent-close>
              {labelFromValue ? labelFromValue(option) : option}
            </button>
          </li>
        )}
        <style jsx>{`
          .DropDownSelector__list {
            position: absolute;
            top: 100%;
            width: 100%;
            list-style: none;
            padding: 0;
            margin: 0;
            border-width: 1px;
          }
          .DropDownSelector__list-item {
            margin: 0
          }
          .DropDownSelector__list-btn {
            margin: 0;
            width: 100%;
            height: 100%;
            display: block;
          }
      `}</style>
      </ul>
    ) : null;
  };

  const renderDesktopDropdown = () => {
    return (
      <div className="DropDownSelector__desktop" data-testid="drop-down-selector-desktop">
        <button
          data-testid="drop-down-toggle-btn"
          ref={triggerBtnEl}
          type="button"
          className="DropDownSelector__trigger"
          onClick={toggleDesktopDropdown}
          data-prevent-close>
          <span className="DropDownSelector__trigger-label">
            {labelFromValue ? labelFromValue(selectOptions[selectedIndex]) : selectOptions[selectedIndex]}
          </span>
        </button>
        {renderDesktopDropdownOptions()}
        <style jsx>{`
          .DropDownSelector__trigger {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            border-radius: 0;
            background-color: transparent;
            border: none;
            margin: 0;
            padding: 0;
          }
          .DropDownSelector__trigger:hover, .DropDownSelector__trigger:focus, .DropDownSelector__trigger:active {
            background-color: transparent;
            border: none;
          }
          .DropDownSelector__trigger-label {
            height: 1px;
            width: 1px;
            overflow: hidden;
            margin: -1px;
            display: block;
          }
      `}</style>
      </div>
    );
  };

  return (
    <div className="DropDownSelector" data-testid="drop-down-selector-component">
      {!isMobile && renderDesktopDropdown()}
      <select
        tabIndex={isMobile ? 0 : -1}
        className="DropDownSelector__options"
        data-testid="drop-down-selector"
        value={selectOptions[selectedIndex]}
        onChange={change}>
        {selectOptions.map((option, index) =>
          <option
            key={index}
            value={option}
            disabled={isDisabled ? isDisabled(option) : false}>
            {labelFromValue ? labelFromValue(option) : option}
          </option>
        )}
      </select>
      <style jsx>{`
        .DropDownSelector {
          position: relative;
          display: inline-block;
        }
      `}</style>
    </div>
  );
};

export default DropDownSelector;
