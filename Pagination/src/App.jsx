import "./App.css";
import useFetchData from "./hooks/useFetchData";

function App() {
  const PRODUCTS_PER_PAGE = 6;
  const { page, setPage, products } = useFetchData(
    "https://dummyjson.com/products"
  );

  const selectPageHandler = (selectedPage) => {
    const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

    if (
      selectedPage >= 1 &&
      selectedPage <= totalPages &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };

  return (
    <>
      {products.length > 0 && (
        <div className="products">
          {products
            .slice((page - 1) * PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE)
            .map((product) => (
              <div key={product.id} className="products__single">
                <img src={product.images[0]} alt={product.description} />
                <h3>{product.title}</h3>
                <p>{product.description}</p>
              </div>
            ))}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination">
          <button
            className={page > 1 ? "" : "pagination__disabled"}
            onClick={() => selectPageHandler(page - 1)}
          >
            👈
          </button>
          {[...Array(Math.ceil(products.length / PRODUCTS_PER_PAGE))].map(
            (_, i) => (
              <span
                key={i}
                onClick={() => selectPageHandler(i + 1)}
                className={page === i + 1 ? "pagination__selected" : ""}
              >
                {i + 1}
              </span>
            )
          )}
          <button
            className={
              page >= Math.ceil(products.length / PRODUCTS_PER_PAGE)
                ? "pagination__disabled"
                : ""
            }
            onClick={() => selectPageHandler(page + 1)}
          >
            👉
          </button>
        </div>
      )}
    </>
  );
}

export default App;
