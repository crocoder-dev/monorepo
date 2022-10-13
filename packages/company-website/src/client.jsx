import ReactDOM from 'react-dom/client';
import React from 'react';
import OurClients from './components/OurClients';
import ContactUs from './components/ContactUs';
import Navigation from './components/Navigation';
import StatusQuoDemo from './components/Blog/ImperativeHandlePost/StatusQuoDemo';
import UncontrolledDemo from './components/Blog/ImperativeHandlePost/UncontrolledDemo';
import Cards from './components/OurClients/Cards';

const components = {
  OurClients,
  ContactUs,
  Navigation,
  StatusQuoDemo,
  UncontrolledDemo,
  Cards,
};

const hydrate = (Component, root, props) => {
  if (!Component) return;
  // eslint-disable-next-line react/jsx-props-no-spreading
  ReactDOM.hydrateRoot(root, <Component {...JSON.parse(props)} />);
};

/**
 * initOnIdle invokes the given callback when the browser is 'idle'
 * If requestIdleCallback is not supported fallover to invoke immediately
 * https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback
 * @param callback - Fired when requestIdleCallback runs
 * @param timeOut - Time after callback will be called and qeued in event loop no metter what
 */
const initOnIdle = (callback, timeOut = 500) => {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(callback, { timeout: timeOut });
  } else {
    callback();
  }
};

/**
 * initOnVisible invokes the given callback when element is in viewport
 * If IntersectionObserver is not supported fallover to invoke callback immediately
 * https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
 * @param callback - Fired when element enters into viewport
 * @param element - HTML element that is observed
 */
const initOnVisible = (callback, element) => {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(([el]) => {
      if (!el.isIntersecting || !el.intersectionRatio > 0) return;
      // Observer diconnected once element has been seen
      observer.disconnect();
      callback();
    });
    observer.observe(element);
  } else {
    callback();
  }
};

const islands = document.querySelectorAll('[data-name]');

islands.forEach((island) => {
  const { props } = island.dataset;
  const Component = components[island.dataset.name];
  const deferUntil = island.dataset.deferuntil;
  switch (deferUntil) {
    case 'idle':
      initOnIdle(() => {
        hydrate(Component, island, props);
      });
      break;
    case 'visible':
      initOnVisible(() => {
        hydrate(Component, island, props);
      }, island);
      break;
    default:
      hydrate(Component, island, props);
      break;
  }
});
