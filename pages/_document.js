import Document, { Html, Head, Main, NextScript } from "next/document";

class MainDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          {/* <div id="product-root"></div> */}
          <div id="cancel-root"></div>
          <div id="filters-root"></div>
          <div id="category-root"></div>
          <div id="accepted-root"></div>
          <div id="failed-root"></div>
          <div id="checkout-root"></div>
        </body>
      </Html>
    );
  }
}

export default MainDocument;