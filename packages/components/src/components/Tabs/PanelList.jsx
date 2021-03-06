/* eslint-disable no-plusplus */
import React, { useMemo } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import styles from "./index.module.scss";

const PanelList = ({
  className,
  children,
  selectedIndex,
  preventPanelUnmount,
  animation = "enter",
}) => {
  const classAnimation = useMemo(() => {
    return (
      (animation === "enter" && styles.enter) ||
      (animation === "fastEnter" && styles.fastEnter)
    );
  }, [animation]);

  const singlePanel = useMemo(() => {
    return (
      <div
        key={classAnimation ? selectedIndex : null}
        className={classnames(
          styles.tabs__panelList,
          className,
          classAnimation
        )}
      >
        {children && children[selectedIndex]}
      </div>
    );
  }, [children, classAnimation, className, selectedIndex]);

  const allPanels = useMemo(() => {
    return (
      <div className={classnames(styles.tabs__panelList, className)}>
        {React.Children.map(children, (child, index) => {
          return React.cloneElement(child, {
            hidden: selectedIndex !== index,
            classAnimation,
          });
        })}
      </div>
    );
  }, [children, classAnimation, className, selectedIndex]);

  return preventPanelUnmount ? allPanels : singlePanel;
};

PanelList.tabType = "PanelList";

PanelList.propTypes = {
  /**
   * Animation that will be triggered each time content changes.
   */
  animation: PropTypes.oneOf(["none", "enter", "fastEnter"]),
  /**
   * Children of PanelList elements. This elements should be of type Panel
   */
  children: PropTypes.node,
  /**
   * Additional classname for PanelList component.
   */
  className: PropTypes.string,
  /**
   * Indicator if children will be rendered each time or they will be hidden and visible on demand. Defaults to false.
   * If set to true all panels will be rendered at once and will stay like that until tabs component is unmounted.
   * If set to false each panel will unmount when deselected.
   */
  preventPanelUnmount: PropTypes.bool,
  /**
   * Panel with this index will be shown.
   */
  selectedIndex: PropTypes.number,
};

export default PanelList;
