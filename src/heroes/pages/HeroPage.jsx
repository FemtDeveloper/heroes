import { useMemo } from "react";

import { useParams, Navigate, useNavigate } from "react-router-dom";
import { getHeroById } from "../helpers";

export const HeroPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const hero = useMemo(() => getHeroById(id), [id]);

  const onNavigateBack = () => {
    navigate(-1);
  };

  if (!hero) {
    return <Navigate to={"/marvel"} />;
  }

  console.log(hero);
  return (
    <div className="row mt-5 animate__animated animate__fadeIn ">
      <div className="col-4">
        <img
          src={`/assets/heroes/${id}.jpg`}
          alt={hero.superhero}
          className="img-thumbnail"
        />
      </div>
      <div className="col-8">
        <h3>{hero.superhero}</h3>
        <ul className="list-group list-group-flush">
          <li className="list-item">
            <b>Alter ego: </b>
            {hero.alter_ego}
          </li>
          <li className="list-item">
            <b>Publisher: </b>
            {hero.publisher}
          </li>
          <li className="list-item">
            <b>First Appereance: </b>
            {hero.first_appearance}
          </li>
        </ul>
        <h5 className="mt-2">{hero.characters}</h5>

        <button className="btn btn-outline-primary" onClick={onNavigateBack}>
          Back
        </button>
      </div>
    </div>
  );
};
