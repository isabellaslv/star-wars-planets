"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import "./page.scss";
import TerrainIcon from "@mui/icons-material/Terrain";
import StraightenIcon from "@mui/icons-material/Straighten";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import PublicTwoToneIcon from "@mui/icons-material/PublicTwoTone";
import PeopleIcon from "@mui/icons-material/People";
import Loading from "@/components/loading";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface PlanetDetail {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  population: string;
  residents: string[];
}

interface Resident {
  name: string;
  hair_color: string;
  eye_color: string;
  gender: string;
  species: string[];
  vehicles: string[];
}

interface Species {
  name: string;
}

interface Vehicle {
  name: string;
  model: string;
}

export default function PlanetPage() {
  const { id } = useParams();
  const [planet, setPlanet] = useState<PlanetDetail | null>(null);
  const [residents, setResidents] = useState<Resident[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPlanet = async () => {
      setLoading(true);
      try {
        const planetRes = await fetch(`https://swapi.dev/api/planets/${id}/`);
        const planetData: PlanetDetail = await planetRes.json();
        setPlanet(planetData);

        const residentData: Resident[] = await Promise.all(
          planetData.residents.map(async (url) => {
            const res = await fetch(url);
            const data: any = await res.json();

            const speciesNames: string[] = await Promise.all(
              data.species.map(async (sUrl: string) => {
                const sRes = await fetch(sUrl);
                const sData: Species = await sRes.json();
                return sData.name;
              })
            );

            const vehicleNames: string[] = await Promise.all(
              data.vehicles.map(async (vUrl: string) => {
                const vRes = await fetch(vUrl);
                const vData: Vehicle = await vRes.json();
                return `${vData.name} (${vData.model})`;
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
        <ArrowBackIcon style={{ color: "#fff", marginRight: "0.5rem" }} />
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
