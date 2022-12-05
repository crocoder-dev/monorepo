import React from 'react';
import PageLayout from '../Layouts/PageLayout';
import ResponsiveImage from '../components/ResponsiveImage';
// eslint-disable-next-line import/no-unresolved
import CroCoderУкраїна from '../content/images/crocoder-Україна.png?preset=responsive';
import Section from '../components/Section';

const Blocked = () => (<PageLayout><Section><ResponsiveImage src={CroCoderУкраїна} alt="CroCoder crocodile in Ukranian traditional clothing" /></Section></PageLayout>);

export default Blocked;
