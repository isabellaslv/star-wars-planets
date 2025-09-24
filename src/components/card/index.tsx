import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styles from "./style.module.scss";
import PublicTwoToneIcon from "@mui/icons-material/PublicTwoTone";

export default function BasicCard() {
  return (
    <Card sx={{ minWidth: 275 }} className={styles.card}>
      <CardContent>
        <Typography variant="h5" component="div">
          <PublicTwoToneIcon sx={{ fontSize: 20 }} />
          Tatooine
        </Typography>
        <small> </small>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
