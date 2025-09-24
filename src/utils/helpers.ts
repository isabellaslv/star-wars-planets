import { Planets, Planet, Film } from "@/interfaces/types";

export const mapPlanet = (planet: Planets, films: Film[]): Planet => {
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
};
