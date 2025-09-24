import * as React from "react";
import Button from "@mui/material/Button";
import "./style.scss";
import StraightenIcon from "@mui/icons-material/Straighten";
import TerrainIcon from "@mui/icons-material/Terrain";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import MovieIcon from "@mui/icons-material/Movie";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface Planet {
  name: string;
  terrain: string;
  diameter: string;
  climate: string;
  films: string[];
  url: string;
}

interface CardProps {
  planet: Planet;
}

export default function Card({ planet }: CardProps) {
  return (
    <div className="card">
      <h2 className="title">{planet.name}</h2>
      <div className="info">
        <p>
          <TerrainIcon
            style={{
              verticalAlign: "middle",
              marginRight: 4,
              color: "#746a87",
            }}
          />
          Terrain: {planet.terrain}
        </p>
        <p>
          <StraightenIcon
            style={{
              verticalAlign: "middle",
              marginRight: 4,
              color: "#4e615b",
            }}
          />
          Diameter: {planet.diameter}
        </p>
        <p>
          <WbSunnyIcon style={{ verticalAlign: "middle", marginRight: 4 }} />
          Climate: {planet.climate}
        </p>
        <p>
          <MovieIcon
            style={{
              verticalAlign: "middle",
              marginRight: 4,
              color: "#4d617b",
            }}
          />
          Films: {planet.films.join(", ")}
        </p>
      </div>
    </div>
  );
}
