import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function Paginate({ pages, page, isAdmin = false, keyword = "" }) {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((i) => {
          return (
            <LinkContainer
              key={i + 1}
              to={
                !isAdmin
                  ? keyword
                    ? `/search/${keyword}/page/${i + 1}`
                    : `/page/${i + 1}`
                  : `/admin/productlist/${i + 1}`
              }
            >
              <Pagination.Item active={i + 1 === page}>{i + 1}</Pagination.Item>
            </LinkContainer>
          );
        })}
      </Pagination>
    )
  );
}

export default Paginate;
