import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

const renderApp = ({ providers = {}, App, req }) => {
  if (__IS_BROWSER__) {
    ReactDOM.hydrate(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
      document.getElementById('app'),
    );
  } else {
    const sheet = new ServerStyleSheet();
    const markup = renderToString(
      <StyleSheetManager sheet={sheet.instance}>
        <StaticRouter location={req.url}>
          <App />
        </StaticRouter>
      </StyleSheetManager>,
    );
    const styles = sheet.getStyleTags();
    const html = `
    <!DOCTYPE html>
    <html>
      <head>
      ${styles}
        <title>Resplash</title>
      </head>
      <body>
        <div id="app">${markup}</div>
      </body>
      <script src="${__CONFIG__.assetsUrl}/${__NAME__}/build/client/js/main.js" defer></script>
    </html>
    `;
    return html;
  }
};

export default renderApp;
