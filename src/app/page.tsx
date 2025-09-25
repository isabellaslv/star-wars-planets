"use client";
import { useState, useEffect, ChangeEvent } from "react";
import Card from "@/components/card";
import { PLANETS_API, FILMS_API } from "@/utils/constants";
import { mapPlanet } from "@/utils/helpers";
import { Pagination } from "@mui/material";
import { Planets, Planet, Film } from "@/interfaces/types";
import Search from "@/components/search";
import "./page.scss";
import Loading from "@/components/loading";

export default function PlanetsPage() {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [notFound, setNotFound] = useState(false);

  const fetchPlanets = async (
    pageValue: number,
    filmsList: Film[],
    search?: string
  ) => {
    setLoading(true);
    setNotFound(false);
    try {
      const res = await fetch(
        `${PLANETS_API}?page=${pageValue}&search=${search || ""}`
      );
      const data = await res.json();
      setTotalPages(Math.ceil(data.count / 10));
      setPlanets(data.results.map((p: Planets) => mapPlanet(p, filmsList)));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchFilmsAndPlanets = async () => {
      try {
        const res = await fetch(FILMS_API);
        const data = await res.json();
        setFilms(data.results);
        await fetchPlanets(1, data.results);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFilmsAndPlanets();
  }, []);

  const handlePageChange = (_: unknown, value: number) => {
    setPage(value);
    fetchPlanets(value, films, searchTerm);
  };

  const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setPage(1);
    setSearchTerm(searchValue);
    setLoading(true);
    setNotFound(false);
    try {
      const res = await fetch(`${PLANETS_API}?search=${searchValue}`);
      const data = await res.json();
      if (data.count === 0) {
        setPlanets([]);
        setNotFound(true);
        setTotalPages(1);
      } else {
        setPlanets(data.results.map((p: Planets) => mapPlanet(p, films)));
        setTotalPages(Math.ceil(data.count / 10));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <Search onChange={handleSearch} />
      {loading && <Loading />}
      {notFound && <div className="loading-container">Planet not found</div>}
      {!notFound && !loading && (
        <>
          <div className="list">
            {planets.map((planet) => (
              <Card key={planet.url} planet={planet} />
            ))}
          </div>
          <div className="pagination-container">
            <Pagination
              className="pagination"
              count={totalPages}
              page={page}
              onChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  );
}
