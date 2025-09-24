"use client";

import { useState } from "react";
import styles from "./page.module.css";
import BasicCard from "@/components/card";
import { Pagination } from "@mui/material";

interface Planet {
  name: string;
  terrain: string;
  diameter: string;
  climate: string;
  films: string[];
  url: string;
}

export default function PlanetsPage() {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [loading, setLoading] = useState(true);

  // if (loading) return <div className={styles.loading}>Loading planets...</div>;

  return (
    <div className={styles.page}>
      <div className={styles.list}>
        <BasicCard />
        <BasicCard />
        <BasicCard />
        <BasicCard />
        <BasicCard />
        <BasicCard />
        <BasicCard />
        <BasicCard />
        <BasicCard />
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Pagination count={10} />
      </div>
    </div>
  );
}
