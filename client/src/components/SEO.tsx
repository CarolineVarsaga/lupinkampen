import { Helmet } from "react-helmet";

interface ISEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
}

const SEO = ({ title, description, image, url }: ISEOProps) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    {url && <meta property="og:url" content={url} />}
    {image && <meta property="og:image" content={image} />}
  </Helmet>
);

export default SEO;
