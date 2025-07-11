import "@/styles/globals.css";
import type { AppProps } from "next/app";

import "@fortawesome/fontawesome-svg-core/styles.css";
// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css";

// used for code syntax highlighting (optional)
import "prismjs/themes/prism-tomorrow.css";

// used for rendering equations (optional)
import "katex/dist/katex.min.css";
import { Inter } from "next/font/google";
import Head from "next/head";
import NextProgress from "next-progress";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" type="image/x-icon" href="/logo.png" sizes="any" />
        <style
          dangerouslySetInnerHTML={{
            __html:
              /* css */
              `
          * {
            -webkit-tap-highlight-color: transparent;
            font-family: var(--font-inter);
          }
          body {
            overscroll-behavior-y: none;
          }
          .notion-header {
            -webkit-backdrop-filter: saturate(160%) blur(16px);
            backdrop-filter: saturate(160%) blur(16px);
            background: rgba(255, 255, 255, 0.32) !important;
          }
          .notion-frame {
            padding-top: 0px !important;
          }
          .notion-page-scroller {
            min-height: calc(100vh - 10px - var(--notion-header-height)) !important;
          }
          .notion-column {
            padding-left: 2px;
            padding-right: 2px;
          }
          .notion-callout > .notion-page-icon-inline {
            display: none;
          }
          .notion-h2 {
            margin-top: 0rem !important;
          }
          .notion-collection-card-property:not(:first-child) {
            white-space: break-spaces !important;
          }
        `,
          }}
        />
      </Head>
      <div className={`${inter.variable} flex max-sm:flex-col`}>
        <div
          className="h-screen sm:overflow-auto"
          style={{
            width: "100%",
          }}
        >
          <Component {...pageProps} />
        </div>
        <NextProgress />
      </div>
    </>
  );
}
