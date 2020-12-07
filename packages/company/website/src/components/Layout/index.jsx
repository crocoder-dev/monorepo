import React from "react";
import "./index.css";
import { Link, navigate } from "gatsby";
import "@crocoder-dev/components/lib/main.css";
import { Navigation, Button } from "@crocoder-dev/components";
import Footer from "../Footer";
import CrocNav from "../../images/croc-nav.svg";
import Head from "../Head";
import { Location } from '@reach/router';

const Layout = ({ children, stickyFooter, pageTitle, scrollToContactUs }) => {
  return (
    <Location>
      {({ location }) => (
        <>
          <Head pageTitle={pageTitle} />
          <Navigation
            Logo={
              <Link to="/">
                <CrocNav />
              </Link>
            }
          >
            {(toggle) => (
              <Button
                onClick={() => {
                  toggle();
                  window.sa_event(
                    `${process.env.GATSBY_SCHEDULE_CALL_NAVIGATION_CLICK_SA_EVENT}`
                  );
                  if(location.pathname !== '/') {
                    navigate('/');
                  } else {
                    scrollToContactUs();
                  }
                }}
                variant="secondary"
              >
                Contact Us
              </Button>
            )}
          </Navigation>
          {children}
          <Footer sticky={stickyFooter} />
        </>
      )}
    </Location>
  );
};

export default Layout;
