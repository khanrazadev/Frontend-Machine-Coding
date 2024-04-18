import { useEffect, useState } from "react";

const useFetchData = (API) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(API);
      const data = await res.json();

      if (data && data.products) {
        setProducts(data.products);
      }
    };
    fetchData();
  }, []);

  return { page, setPage, products };
};

export default useFetchData;
