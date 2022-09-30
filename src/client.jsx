// Hydrate
import ReactDOM from 'react-dom/client';
import React from 'react';
import Example from './components/Example';
import OurClients from './components/OurClients';
import ContactUs from './components/ContactUs';

const components = {
  Example,
  OurClients,
  ContactUs,
};

const islands = document.querySelectorAll('[data-name]');

islands.forEach((island) => {
  console.log(island.dataset);
  const root = document.querySelector(`[data-name=${island.dataset.name}]`);
  const props = root.dataset.props;
  const Component = components[island.dataset.name];
  if (!Component) return;
  ReactDOM.hydrateRoot(island, <Component {...JSON.parse(props)} />);
});
