import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Toaster } from 'react-hot-toast';

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <HelmetProvider>
      <div>
        <Helmet>
          <meta charSet="UTF-8" />
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content={author} />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>{title}</title>
        </Helmet>
        <Header />
        <main style={{ minHeight: "75vh" }}>
        <Toaster/>  
          {children}</main>
        <Footer />
      </div>
    </HelmetProvider>
  );
};

Layout.defaultProps = {
  title: "Ecommerce app - shop now",
  description: "mern stack project",
  keywords: "mern,react,node,mongodb",
  author: "Hrithik",
};

export default Layout;
