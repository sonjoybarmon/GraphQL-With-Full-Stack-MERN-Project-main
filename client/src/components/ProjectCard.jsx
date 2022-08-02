import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" color="inherit">
          {project.name}
        </Typography>

        <Typography variant="subtitle1" color="inherit" sx={{ mt: 1 }}>
          Status: <strong>{project.status}</strong>
        </Typography>

        <Stack sx={{ my: 1 }}>
          <Link
            to={`/project/${project.id}`}
            style={{ textDecoration: "none" }}
          >
            <Button variant="outlined" color="primary">
              View
            </Button>
          </Link>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
