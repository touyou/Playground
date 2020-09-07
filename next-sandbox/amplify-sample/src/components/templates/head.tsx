import * as React from "react";
import Head from "next/head";
import info from "../../../package.json";

const defaultOGURL = "";
const defaultOGImage = "";

interface Props {
  title: string;
  description?: string;
  url?: string;
  ogImage?: string;
}

const head: React.FC<Props> = (props) => {
  return (
    <Head>
      <meta charSet="UTF-8" />
      <title>{props.title || ""}</title>
      <meta
        name="description"
        content={props.description || info.description}
      />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:url" content={props.url || defaultOGURL} />
      <meta property="og:title" content={props.title || ""} />
      <meta
        property="og:description"
        content={props.description || info.description}
      />
      <meta name="twitter:site" content={props.url || defaultOGURL} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={props.ogImage || defaultOGImage} />
      <meta property="og:image" content={props.ogImage || defaultOGImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
    </Head>
  );
};

export default head;
