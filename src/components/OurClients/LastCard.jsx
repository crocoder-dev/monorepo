import { motion } from 'framer-motion';
import Typography from '../Typography';
import Button from '../Button';
import * as styles from './index.module.scss';

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1 } },
};

const LastCard = ({ lastCard }) => {
  return (
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
      <a href="#contact-us">
        <Button className={styles.button} variant="primary">
          {lastCard.action}
        </Button>
      </a>
    </motion.div>
  );
};
export default LastCard;
