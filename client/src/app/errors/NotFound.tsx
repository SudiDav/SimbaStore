import React from "react";
import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Container component={Paper}>
      <Typography gutterBottom variant="h3" sx={{ height: 400 }}>
        Ooops we could not found what you were looking for!
      </Typography>
      <Divider />
      <Button component={Link} to="/catalog" fullWidth>
        Go back to the Store
      </Button>
    </Container>
  );
}
