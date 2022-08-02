import React from "react";

import TextField from "@mui/material/TextField";
import { Box, Typography, Button } from "@mui/material";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../queries/ClientQuery";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { UPDATE_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECT } from "../queries/projectQuery";

const selectStatus = (status) => {
  if (status === "Not Started") return "new";
  if (status === "In Progress") return "progress";
  if (status === "Completed") return "completed";
};

const EditProject = ({ project }) => {
  const [value, setValue] = React.useState({
    name: project.name,
    description: project.description,
    status: selectStatus(project.status),
  });

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: {
      id: project.id,
      name: value.name,
      description: value.description,
      status: value.status,
    },

    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
  });

  const handleChange = (prop) => (event) => {
    setValue({ ...value, [prop]: event.target.value });
  };

  const handleStatusChange = (event) => {
    setValue({ ...value, status: event.target.value });
  };

  const handleSubmit = () => {
    updateProject(value.name, value.description, value.status);
  };

  return (
    <div>
      <Box sx={{ my: 2 }}>
        <Typography variant="h6" color="inherit">
          <strong>Update Project</strong>
        </Typography>
      </Box>
      <Box sx={{ my: 2, width: { sm: "500px", sx: "320px" } }}>
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          value={value.name}
          onChange={handleChange("name")}
          fullWidth
        />
      </Box>
      <Box sx={{ my: 2, width: { sm: "500px", sx: "320px" } }}>
        <TextField
          id="outlined-basic"
          label="description"
          variant="outlined"
          rows={4}
          value={value.description}
          onChange={handleChange("description")}
          fullWidth
        />
      </Box>
      <Box sx={{ my: 2, width: { sm: "500px", sx: "320px" } }}>
        {/* <TextField
              id="outlined-basic"
              label="status"
              variant="outlined"
              value={value.status}
              onChange={handleChange("status")}
              fullWidth
            /> */}

        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">Status</FormLabel>

          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            // defaultValue="female"
            name="radio-buttons-group"
            value={value.status}
            onChange={handleStatusChange}
          >
            <FormControlLabel
              value="new"
              control={<Radio />}
              label="Not Started"
            />
            <FormControlLabel
              value="progress"
              control={<Radio />}
              label="In Progress"
            />
            <FormControlLabel
              value="completed"
              control={<Radio />}
              label="Completed"
            />
          </RadioGroup>
        </FormControl>

        <Box sx={{ my: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default EditProject;
