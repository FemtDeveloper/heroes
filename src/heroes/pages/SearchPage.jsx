import React from "react";
import queryString from "query-string";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { HeroCard } from "../components/HeroCard";
import { getHeroByName } from "../helpers";

export const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { q = "" } = queryString.parse(location.search);
  const { searchText, onInputChange, onResetForm } = useForm({
    searchText: q,
  });
  const heroes = getHeroByName(q);

  const onSearchSubmit = (e) => {
    e.preventDefault();
    // if (searchText.trim().length <= 2) return;
    navigate(`?q=${searchText}`);
    // onResetForm();
  };

  return (
    <>
      <h1>Search</h1>
      <hr />
      <div className="row">
        <div className="col-5">
          <h4>Searching</h4>
          <form onSubmit={onSearchSubmit}>
            <input
              type="text"
              placeholder="Search a Hero"
              className="form-control"
              name="searchText"
              value={searchText}
              onChange={onInputChange}
            />
            <button className="btn btn-primary mt-2">Search</button>
          </form>
        </div>
        <div className="col-7">
          <h4>Results</h4>
          <hr />

          {q === "" ? (
            <div className="alert alert-success">Search for a Hero</div>
          ) : (
            heroes.length === 0 && (
              <div className="alert alert-danger">
                There is no <b>{q}</b>{" "}
              </div>
            )
          )}
          {heroes.map((hero) => (
            <HeroCard key={hero.id} {...hero} />
          ))}
        </div>
      </div>
    </>
  );
};
