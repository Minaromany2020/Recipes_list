import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
const Favorites = () => {
  const [list, setList] = useState(JSON.parse(localStorage.favorites));
  const [data, setData] = useState([]);
  const [show, setShow] = useState(true);
  const useFetch = async () => {
    let resultarr = [];
    for (let i = 0; i < list?.length; i++) {
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/get?rId=${list[i]}`
      );
      const result = await res.json();
      resultarr.push(result.recipe);
    }
    setData(resultarr);
  };
  useEffect(() => {
    useFetch();
    setShow(false);
  }, [list]);
  const handleRemove = (id) => {
    const newFevoritesList = list.filter((item) => item !== id);
    localStorage.setItem("favorites", JSON.stringify(newFevoritesList));
    setList(JSON.parse(localStorage.favorites));
  };
  return (
    <div>
      <Navbar show={show} />
      <div className="flex flex-wrap gap-5 p-5 justify-center mt-10">
        {data.length > 0 ? (
          data.map((item, index) => {
            return (
              <div
                className="card bg-base-100 w-80 h-80 shadow-xl"
                key={index}
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
                    <button
                      className="btn btn-primary"
                      onClick={() => handleRemove(item.recipe_id)}
                    >
                      Remove
                    </button>
                    <Link
                      className="btn btn-primary"
                      to={`/details/${item.recipe_id}`}
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-3xl font-bold">
            No favorite item to Show, Please add some items
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
