import React from "react";
import Typography from "../Typography";
import Button from "../Button";
import Section from "../Section";
import styles from "./index.module.scss";
import { motion } from "framer-motion";
import Card from "./Card";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
  },
};

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1 } },
};

const OurClients = ({ title, text, lastCard, cards, scrollToContactUs }) => {
  return (
    <Section as={motion.section} className={styles.blue}>
      <div className={styles.section}>
        <Typography
          className={styles.title}
          element="h2"
          fontSize={36}
          fontWeight={700}
          color="gray_2"
        >
          {title}
        </Typography>
        <Typography
          className={styles.text}
          element="p"
          fontSize={18}
          fontWeight={400}
          color="gray_2"
          dangerouslySetInnerHTML={{ __html: text }}
        />
        <motion.div
          layout
          variants={container}
          initial="show"
          animate="show"
          className={styles.grid}
        >
          {cards.map(({ title, image, text, client, imageAlt, url }, index) => (
            <Card
              delay={3 * index}
              key={title}
              name={title}
              image={image}
              description={text}
              client={client}
              imageAlt={imageAlt}
              url={url}
            />
          ))}
          <motion.div
            transition={{ duration: 0.7 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            variants={item}
            className={styles.card}
            key="join-us"
          >
            <Typography
              color="gray_2"
              element="div"
              fontSize={26}
              fontWeight={100}
              className={styles.join}
            >
              {lastCard.text}
            </Typography>
            <Button
              className={styles.button}
              onClick={() => {
                scrollToContactUs && scrollToContactUs();
              }}
              variant="primary"
            >
              {lastCard.action}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
};

export default OurClients;
