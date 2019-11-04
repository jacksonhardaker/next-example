/**
 * Encapsulates a call to window.matchMedia at the screenWidth breakpoint
 * @returns {function} takes a callback function, which is called whenever the matchMedia match changes.
 */
const generateMatchMedia = screenWidth => {
  const isMobile = matchMedia(`only screen and (max-width: ${screenWidth}px)`);

  /**
   * Attaches a callback to fire when the matchMedia match changes
   * @param {function} callback 
   * @returns {Boolean} the initial match for the screenWidth breakpoint
   */
  const attachBreakpointListener = callback => {
    isMobile.addListener(callback);
    return isMobile.matches;
  };

  return attachBreakpointListener;
};

export default generateMatchMedia;
