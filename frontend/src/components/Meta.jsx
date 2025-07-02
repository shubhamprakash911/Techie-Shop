import { Helmet } from "react-helmet-async";

const Meta = ({
  title = "Welcome To Techieshop",
  description = "We sell the best tech products for very affordable price",
  keywords = "electronics, buy electronics, cheap electroincs, phones",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};

export default Meta;
