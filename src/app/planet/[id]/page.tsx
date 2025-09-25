"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import "./page.scss";
import TerrainIcon from "@mui/icons-material/Terrain";
import StraightenIcon from "@mui/icons-material/Straighten";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import PublicTwoToneIcon from "@mui/icons-material/PublicTwoTone";
import PeopleIcon from "@mui/icons-material/People";
import Loading from "@/components/loading";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Planets, Resident, Species, Vehicle } from "@/interfaces/types";
import { PLANETS_API } from "@/utils/constants";

export default function PlanetPage() {
  const [planet, setPlanet] = useState<Planets | null>(null);
  const [residents, setResidents] = useState<Resident[]>([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchPlanet = async () => {
      setLoading(true);
      try {
        const planetRes = await fetch(`${PLANETS_API}${id}/`);
        const planetData: Planets = await planetRes.json();
        setPlanet(planetData);

        const residentData: Resident[] = await Promise.all(
          planetData.residents.map(async (url) => {
            const res = await fetch(url);
            const data: Resident = await res.json();

            const speciesNames: string[] = await Promise.all(
              data.species.map(async (sUrl: string) => {
                const specieRes = await fetch(sUrl);
                const specieData: Species = await specieRes.json();
                return specieData.name;
              })
            );

            const vehicleNames: string[] = await Promise.all(
              data.vehicles.map(async (vehicleUrl: string) => {
                const vehicleRes = await fetch(vehicleUrl);
                const vehicleData: Vehicle = await vehicleRes.json();
                return `${vehicleData.name} (${vehicleData.model})`;
              })
            );

            return {
              name: data.name,
              hair_color: data.hair_color,
              eye_color: data.eye_color,
              gender: data.gender,
              species: speciesNames,
              vehicles: vehicleNames,
            };
          })
        );

        setResidents(residentData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPlanet();
  }, [id]);

  if (!planet && !loading)
    return <div className="loading-container">Planet not found</div>;

  return (
    <div className="page">
      <div className="back-button" onClick={() => (window.location.href = "/")}>
        <ArrowBackIcon className="arrow" />
        Back
      </div>
      {loading && <Loading />}
      {!loading && planet && (
        <div className="block">
          <h1 className="title">{planet.name}</h1>
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
            <p className="gravity">
              <PublicTwoToneIcon className="icon" />
              Gravity: {planet.gravity}
            </p>
            <p className="population">
              <PeopleIcon className="icon" />
              Population: {planet.population}
            </p>
            <p className="rotation">
              <StraightenIcon className="icon" />
              Rotation Period: {planet.rotation_period}
            </p>
            <p className="orbital">
              <WbSunnyIcon className="icon" />
              Orbital Period: {planet.orbital_period}
            </p>
          </div>
          <hr></hr>
          <h2>Residents</h2>
          {residents.length === 0 && <p>No known residents</p>}
          <div className="resident-container">
            {residents.map((resident) => (
              <ul key={resident.name} className="resident-card">
                <li>Name: {resident.name}</li>
                <li>Hair: {resident.hair_color}</li>
                <li>Eyes: {resident.eye_color}</li>
                <li>Gender: {resident.gender}</li>
                <li>Species: {resident.species.join(", ") || "Unknown"}</li>
                <li>Vehicles: {resident.vehicles.join(", ") || "None"}</li>
              </ul>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
