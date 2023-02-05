/* eslint-disable import/no-unresolved */
import React from 'react';
import styles from '../index.module.scss';
import LastCard from './LastCard';
import Card from './Card';
import skewImage from '../../../content/images/skew.png?preset=responsive';
import lynesImage from '../../../content/images/lynes.png?preset=responsive';
import misterspexImage from '../../../content/images/misterspex.png?preset=responsive';
import searchmetricsImage from '../../../content/images/searchmetrics.png?preset=responsive';
import transferheroImage from '../../../content/images/transferhero.png?preset=responsive';

const cards = [
  {
    cardTitle: 'Skew Analytics',
    cardText:
      'We worked on building the whole MVP and were responsible for the complete <em>back-end development</em>, <em>devOps/infrastructure setup</em>, and the <em>front-end development</em>. We implemented the whole authentication system, custom dashboard, and set up the basic component library.',
    image: skewImage,
    client: 'skew',
    imageAlt: 'Skew Logo',
    url: 'https://skew.com/',
  },
  {
    cardTitle: 'Searchmetrics',
    cardText:
      'At Searchmetrics, we participated in defining the standards and rules to ease development and reduce development time. We were responsible for the <em>front-end development</em> of new features, worked on <em>improving the developer environment</em> and the <em>front-end CI/CD processes of the shared codebase.</em>',
    image: searchmetricsImage,
    client: 'searchmetrics',
    imageAlt: 'Searchmetrics Logo',
    url: 'https://www.searchmetrics.com/',
  },
  {
    cardTitle: 'Lynes',
    cardText:
      'For Lynes, we helped start their new Croatian office, which included finding the right technical talent and providing them with initial mentoring to make sure they had the right technical as well as soft skills. Additionally, we were responsible for <em>designing and implementing a real-time video communication platform</em>.',
    image: lynesImage,
    client: 'lynes',
    imageAlt: 'Lynes Logo',
    url: 'https://lynes.io/',
  },
  {
    cardTitle: 'TransferHero',
    cardText:
      'Participating as part of a remote team, we were responsible for <em>the back end and front end of the implemented solution</em>. Additionally, we helped with the initial project <em>DevOps setup</em> and were responsible for the complete <em>user account management</em>, implementing the booking system for transfer reservations, and payment system integration via Stripe.',
    image: transferheroImage,
    client: 'transferhero',
    imageAlt: 'TransferHero Logo',
    url: 'https://transferhero.eu/',
  },
  {
    cardTitle: 'Mister Spex',
    cardText:
      'At German-based enterprise Mister Spex, we worked as <em>front-end developers to create a structured shared custom component codebase</em> that can be reused by multiple teams working with different domains. Additionally, we advised on improving the performance and structure of the implemented solution.',
    image: misterspexImage,
    client: 'misterspex',
    imageAlt: 'Mister Spex Logo',
    url: 'https://www.misterspex.de/',
  },
];

const lastCard = {
  text: 'Want to be a part of our success stories?',
  action: 'Contact us',
};

const Cards = () => (
  <div className={styles.grid}>
    {cards.map(({
      cardTitle, image, cardText, client, imageAlt, url,
    }, index) => (
      <Card
        delay={3 * index}
        key={cardTitle}
        name={cardTitle}
        image={image}
        description={cardText}
        client={client}
        imageAlt={imageAlt}
        url={url}
      />
    ))}
    <LastCard lastCard={lastCard} />
  </div>
);
export default Cards;
