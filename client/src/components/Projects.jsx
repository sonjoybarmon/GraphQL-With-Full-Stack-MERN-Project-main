import { useQuery } from "@apollo/client";
import { Box, Container, Grid, Stack } from "@mui/material";
import React from "react";
import { GET_PROJECTS } from "../queries/projectQuery";
import AddProject from "./AddProject";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( somethings went wrong!</p>;
  return (
    <Box sx={{ my: 3 }}>
      <Container>
        <Stack sx={{ width: "100%", my: 2 }} alignItems="flex-end">
          <AddProject />
        </Stack>
        {data.projects.length > 0 ? (
          <Grid container spacing={2}>
            {data.projects.map((project) => (
              <Grid item md={4} sm={6} xs={12} key={project.id}>
                <ProjectCard project={project} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <p>No Projects</p>
        )}
      </Container>
    </Box>
  );
};

export default Projects;
