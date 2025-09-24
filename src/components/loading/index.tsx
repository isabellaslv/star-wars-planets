"use client";

import { CircularProgress } from "@mui/material";
import "./style.scss";

export default function Loading() {
  return (
    <div className="loading-container">
      <CircularProgress className="loading" />
    </div>
  );
}
