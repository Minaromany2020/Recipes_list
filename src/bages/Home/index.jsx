import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
const Home = () => {
  const [input, setInput] = useState("");
  const [search, setSearch] = useState(localStorage.getItem("search") || "");
  const [searchingList, setSearchingList] = useState([]);
  const [show, setShow] = useState(true);
  const [error, setError] = useState(false);
  const handleEnter = () => {
    setSearch(input);
    localStorage.setItem("search", input);
    setInput("");
  };
  const useFetch = async () => {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/search?q=${search}`
    );
    if (res.status >= 200 && res.status <= 299) {
      const data = await res.json();
      setSearchingList(data.recipes);
      setError(false);
    } else {
      setError(true);
      const data = await res.json();
      setSearchingList(data.recipes);
    }
  };
  useEffect(() => {
    useFetch();
  }, [search]);
  return (
    <div>
      <Navbar
        input={input}
        setInput={setInput}
        handleEnter={handleEnter}
        show={show}
      />
      <div className="flex justify-center m-auto flex-wrap gap-5 p-5 mt-10">
        {searchingList ? (
          searchingList.map((item) => {
            return (
              <div
                className="card bg-base-100 w-80 h-80 shadow-xl"
                key={item.recipe_id}
                id={item.recipe_id}
              >
                <figure className="px-10 pt-10">
                  <img
                    src={item.image_url}
                    alt="Shoes"
                    className="rounded-xl"
                    width={200}
                    height={200}
                  />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title">{item.title}</h2>
                  <div className="card-actions">
                    <Link
                      className="btn btn-primary"
                      to={`/details/${item.recipe_id}`}
                    >
                      More Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-3xl font-bold flex flex-col items-center">
            Nothing to Show, Please Search For Some Thing
            {error ? (
              <div className="text-3xl font-bold text-red-600">
                There is no {search} in The recipes
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
