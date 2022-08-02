import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import { Box, Typography } from "@mui/material";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../queries/ClientQuery";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { ADD_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECTS } from "../queries/projectQuery";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function AddProject() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState({
    name: "",
    description: "",
    status: "new",
  });
  const [clientId, setClientId] = React.useState("");

  // get clients for select
  const { loading, error, data } = useQuery(GET_CLIENTS);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (prop) => (event) => {
    setValue({ ...value, [prop]: event.target.value });
  };

  const handleStatusChange = (event) => {
    setValue({ ...value, status: event.target.value });
  };

  const handleClientChange = (event) => {
    setClientId(event.target.value);
  };

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: {
      name: value.name,
      description: value.description,
      status: value.status,
      clientId: clientId,
    },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
  });

  const handleSubmit = () => {
    if (value.name && value.description && value.status) {
      addProject(value.name, value.description, value.status, clientId);
      setOpen(false);
    }

    setValue({
      name: "",
      description: "",
      status: "new",
    });

    setClientId("");
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Project
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          New Project
        </BootstrapDialogTitle>
        <DialogContent dividers>
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
              <FormLabel id="demo-controlled-radio-buttons-group">
                Status
              </FormLabel>

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
          </Box>

          <Box>
            <Typography variant="h6" color="inherit">
              <strong>Client</strong>
            </Typography>

            <FormControl sx={{ m: 0, mt: 1, minWidth: 200 }} size="small">
              <InputLabel id="demo-select-small">Select Client</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={clientId}
                // label="Age"
                onChange={handleClientChange}
              >
                {data &&
                  data.clients.map((client) => (
                    <MenuItem key={client.id} value={client.id}>
                      {client.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSubmit}>
            Add
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
