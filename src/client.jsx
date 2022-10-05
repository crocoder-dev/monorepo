// Hydrate
import ReactDOM from 'react-dom/client';
import React from 'react';
import Example from './components/Example';
import OurClients from './components/OurClients';
import ContactUs from './components/ContactUs';
import Card from './components/OurClients/Card';

const components = {
  Example,
  OurClients,
  ContactUs,
  Card,
};

const hydrate = (Component, root, props) => {
  if (!Component) return;
  ReactDOM.hydrateRoot(root, <Component {...JSON.parse(props)} />);
};

const initOnDelay = (callback, delay = 300) => {
  setTimeout(callback, delay);
};

const initOnIdle = (callback, timeOut = 500) => {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(callback, { timeout: timeOut });
  } else {
    //If rIC is not supported fallover to delay hydration for 200ms
    initOnDelay(callback, 200);
  }
};

const initOnVisible = (callback, element) => {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(([el]) => {
      if (!el.isIntersecting || !el.intersectionRatio > 0) return;
      observer.disconnect();
      callback();
    });
    observer.observe(element);
  } else {
    //If IO is not supported fallover to move callback invocation to end of call stack
    initOnDelay(callback, 0);
  }
};

const islands = document.querySelectorAll('[data-name]');

islands.forEach((island) => {
  const element = document.querySelector(`[data-name=${island.dataset.name}]`);
  const props = element.dataset.props;
  const Component = components[island.dataset.name];
  const deferUntil = element.dataset.deferuntil;
  switch (deferUntil) {
    case 'idle':
      initOnIdle(() => {
        hydrate(Component, island, props);
      });
      break;
    case 'delay':
      initOnDelay(() => {
        hydrate(Component, island, props);
      });
      break;
    case 'visible':
      initOnVisible(() => {
        hydrate(Component, island, props);
      }, element);
      break;
    default:
      hydrate(Component, island, props);
      break;
  }
});
