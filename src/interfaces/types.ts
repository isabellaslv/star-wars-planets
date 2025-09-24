export type Planet = {
  name: string;
  terrain: string;
  diameter: string;
  climate: string;
  films: string[];
  url: string;
};

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
