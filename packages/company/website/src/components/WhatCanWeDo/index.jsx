import React from "react";
import Img from "gatsby-image";
import { StaticQuery, graphql } from "gatsby";
import { Typography, Section, Flexbox } from "@crocoder-dev/components";
import styles from "./index.module.scss";

const WhatCanWeDo = ({ title1, text1, title2, text2, image1, image2 }) => [
  <Section
    key="initial"
    className={styles.section}
    backgroundColor="background_base"
    id="second-section"
  >
    <Flexbox alignItems="center" className={styles.flex}>
      <Img
        className={styles.image}
        fadeIn={false}
        fluid={image1 ? image1.childImageSharp.fluid : {}}
        alt={"abc"}
      />
      <Typography
        className={styles.first}
        element="h3"
        fontSize={26}
        fontWeight={700}
        color="gray_2"
      >
        {title1}
        <Typography
          className={styles.paragraph}
          fontSize={18}
          fontFamily="rubik"
          color="gray_11"
          element="div"
        >
          <div dangerouslySetInnerHTML={{ __html: text1 }} />
        </Typography>
      </Typography>
    </Flexbox>
    <Flexbox alignItems="center" className={styles.flex}>
      <Typography
        className={styles.second}
        element="h3"
        fontSize={26}
        fontWeight={700}
        color="gray_2"
      >
        {title2}
        <Typography
          className={styles.paragraph}
          fontSize={18}
          fontFamily="rubik"
          color="gray_11"
          element="div"
        >
          <div dangerouslySetInnerHTML={{ __html: text2 }} />
        </Typography>
      </Typography>

      <Img
        fadeIn={false}
        className={styles.image}
        fluid={image2 ? image2.childImageSharp.fluid : {}}
        alt={"abc"}
      />
    </Flexbox>
  </Section>,
  <Section key="second" className={styles.smallMobile} backgroundColor="white">
    <Typography
      element="h3"
      color="gray_2"
      className={styles.focus}
      textAlign="center"
      fontFamily="rubik"
      fontSize={36}
      fontWeight={300}
    >
      Let{" "}
      <Typography fontWeight={600}>
        <em>Cro</em>Coder
      </Typography>{" "}
      lighten the load by implementing your idea, so{" "}
      <em>you can focus on things only you can do for your business</em>.
    </Typography>
  </Section>,
];

const WithQuery = () => (
  <StaticQuery
    query={graphql`
      query {
        homeJson {
          whatCanWeDo {
            title1
            text1
            title2
            text2
            image1 {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            image2 {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    `}
    render={(data) => <WhatCanWeDo {...data.homeJson.whatCanWeDo} />}
  />
);

export default WithQuery;
