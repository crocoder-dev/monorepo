import Layout from "../components/Layout";
import Typography from "../components/Typography";
import Section from "../components/Section";
import Button from "../components/Button";
import notfoundJSON from "../content/notfound.json";

export default function Custom404({ pathname }) {
  const notfoundImage = require("../content/images/404.png");

  const meta = {
    title: "404",
    description: notfoundJSON.subtitle,
  };

  return (
    <Layout title={meta.title} description={meta.description} slug={pathname}>
      <Section>
        <img src={notfoundImage} alt={notfoundJSON.title} />
        <Typography element="h1" fontWeight={400}>
          {notfoundJSON.title}
        </Typography>
        <Typography element="h2" fontWeight={400}>
          {notfoundJSON.subtitle}
        </Typography>
        <Typography element="p">
          <a href="/">
            <Button>{notfoundJSON.homepage}</Button>
          </a>
        </Typography>
      </Section>
    </Layout>
  );
}
