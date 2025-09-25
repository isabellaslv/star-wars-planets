import React from "react";
import { useRouter } from "next/navigation";
import "./style.scss";
import TerrainIcon from "@mui/icons-material/Terrain";
import StraightenIcon from "@mui/icons-material/Straighten";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import MovieIcon from "@mui/icons-material/Movie";
import { Planet } from "@/interfaces/types";

interface CardProps {
  planet: Planet;
}

export default function Card({ planet }: CardProps) {
  const router = useRouter();

  const handleClick = () => {
    const id = planet.url.split("/").filter(Boolean).pop();
    router.push(`/planet/${id}`);
  };

  return (
    <div className="card" onClick={handleClick} role="button" tabIndex={0}>
      <h2 className="title">{planet.name}</h2>
      <div className="info">
        <p className="terrain">
          <TerrainIcon className="icon" />
          Terrain: {planet.terrain}
        </p>
        <p className="diameter">
          <StraightenIcon className="icon" />
          Diameter: {planet.diameter}
        </p>
        <p className="climate">
          <WbSunnyIcon className="icon" />
          Climate: {planet.climate}
        </p>
        <p className="films">
          <MovieIcon className="icon" />
          Films: {planet.films.join(", ")}
        </p>
      </div>
    </div>
  );
}
