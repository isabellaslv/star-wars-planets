import { ChangeEvent } from "react";

export interface Planet {
  name: string;
  terrain: string;
  diameter: string;
  climate: string;
  films: string[];
  url: string;
}

export interface Planets {
  name: string;
  diameter: string;
  rotation_period: string;
  orbital_period: string;
  gravity: string;
  population: string;
  climate: string;
  terrain: string;
  surface_water: string;
  residents: string[];
  films: string[];
  url: string;
  created: string;
  edited: string;
}

export interface Film {
  title: string;
  planets: string[];
  url: string;
}

export interface SearchProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface Resident {
  name: string;
  hair_color: string;
  eye_color: string;
  gender: string;
  species: string[];
  vehicles: string[];
}

export interface Species {
  name: string;
}

export interface Vehicle {
  name: string;
  model: string;
}
