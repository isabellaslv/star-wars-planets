"use client";

import { useState, useEffect } from "react";
import "./page.scss";
import Card from "@/components/card";
import { Pagination, CircularProgress } from "@mui/material";
import { Planets, Planet, Film } from "@/interfaces/types";
import Search from "@/components/search";

export default function PlanetsPage() {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const filmRes = await fetch("https://swapi.dev/api/films/");
        const filmData = await filmRes.json();
        setFilms(filmData.results);
        fetchPlanets(1, filmData.results);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFilms();
  }, []);

  const fetchPlanets = async (value: number, films: Film[]) => {
    setLoading(true);
    try {
      const planetRes = await fetch(
        `https://swapi.dev/api/planets/?page=${value}`
      );
      const planetData = await planetRes.json();

      setTotalPages(Math.ceil(planetData.count / 10));

      const planetsWithFilms: Planet[] = planetData.results.map(
        (planet: Planets) => {
          const filmTitles = planet.films.map((filmUrl: string) => {
            const film = films.find((f: Film) => f.url === filmUrl);
            return film ? film.title : "";
          });

          return {
            name: planet.name,
            terrain: planet.terrain,
            diameter: planet.diameter,
            climate: planet.climate,
            films: filmTitles,
            url: planet.url,
          };
        }
      );

      setPlanets(planetsWithFilms);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (_: unknown, value: number) => {
    setPage(value);
    fetchPlanets(value, films);
  };

  if (loading)
    return (
      <div className="loading-container">
        <CircularProgress style={{ color: "#ffffff" }} />
      </div>
    );

  return (
    <div className="page">
      <Search />
      <div className="list">
        {planets.map((planet) => (
          <Card key={planet.url} planet={planet} />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Pagination
          className="pagination"
          count={totalPages}
          page={page}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}
