import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useParams } from "react-router-dom";
const Details = () => {
  const [fevoritesList, setFevoritesList] = useState([]);
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isfavor, setIsFavor] = useState(false);
  const [show, setShow] = useState(true);
  const useFetch = async () => {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/get?rId=${id}`
    );
    const data = await res.json();
    console.log(data.recipe);
    setRecipe(data.recipe);
  };
  const handelClick = () => {
    if (isfavor) {
      setIsFavor(false);
      const newFevoritesList = fevoritesList.filter((item) => item !== id);
      localStorage.setItem("favorites", JSON.stringify(newFevoritesList));
    } else {
      if (!fevoritesList?.includes(id)) {
        console.log(fevoritesList);
        const newFevoritesList = [...fevoritesList, id];
        localStorage.setItem("favorites", JSON.stringify(newFevoritesList));
        setIsFavor(true);
      }
    }
  };
  useEffect(() => {
    useFetch();
    setFevoritesList(JSON.parse(localStorage.getItem("favorites")) || []);
    if (JSON.parse(localStorage.getItem("favorites"))?.includes(id)) {
      setIsFavor(true);
    }
    setShow(false);
  }, [isfavor]);

  return (
    <div>
      <Navbar show={show} />
      <div className="flex justify-evenly m-auto flex-row gap-5 p-5 mt-10 w-4/5">
        <div className="w-1/2 p-8 flex flex-col">
          <img src={recipe?.image_url} alt="" width={300} />
        </div>
        <div className="w-1/2 p-8">
          {recipe?.ingredients?.map((e, index) => {
            return <p key={index}>{e}</p>;
          })}
          <button className="btn btn-primary w-56 mt-16" onClick={handelClick}>
            {isfavor ? "Remove From Fevorites" : "Add To Fevorites"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;
