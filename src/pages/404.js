import Layout from "../components/Layout";
import Typography from "../components/Typography";
import Section from "../components/Section";
import Button from "../components/Button";
// TODO: Remove - import Image from "next/image";
// TODO: Remove - import Link from "next/link";
import notfoundJSON from "../content/notfound.json";
// TODO: Remove - import { useRouter } from "next/router";

export default function Custom404() {
  const notfoundImage = require("../content/images/404.png");

  const router = useRouter();

  const meta = {
    title: "404",
    description: notfoundJSON.subtitle,
  };

  return (
    <Layout
      title={meta.title}
      description={meta.description}
      slug={router?.pathname}
    >
      <Section>
        <Image
          loader={({ src }) => src}
          src={notfoundImage}
          alt={notfoundJSON.title}
        />
        <Typography element="h1" fontWeight={400}>
          {notfoundJSON.title}
        </Typography>
        <Typography element="h2" fontWeight={400}>
          {notfoundJSON.subtitle}
        </Typography>
        <Typography element="p">
          <Link href="/">
            <Button>{notfoundJSON.homepage}</Button>
          </Link>
        </Typography>
      </Section>
    </Layout>
  );
}
