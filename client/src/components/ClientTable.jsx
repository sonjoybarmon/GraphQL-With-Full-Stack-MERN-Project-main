import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/ClientQuery";
import { GET_PROJECTS } from "../queries/projectQuery";

const TableRows = ({ client }) => {
  console.log(client, "check");
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
    // update(cache, { data: { deleteClient } }) {
    //   const { clients } = cache.readQuery({ query: GET_CLIENTS });
    //   cache.writeQuery({
    //     query: GET_CLIENTS,
    //     data: { clients: clients.filter((c) => c.id !== client.id) },
    //   });
    // },
  });
  return (
    <TableRow
      key={client.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="client">
        {client.id}
      </TableCell>
      <TableCell align="right">{client.name}</TableCell>
      <TableCell align="right">{client.email}</TableCell>
      <TableCell align="right">{client.phone}</TableCell>
      <TableCell align="right">
        <IconButton onClick={deleteClient}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default function ClientTable({ data }) {
  return (
    <TableContainer sx={{ width: "100%" }} component={Paper}>
      <Table style={{ width: "100%" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRows client={row} key={row.id} />
            // <TableRow
            //   key={row.id}
            //   sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            // >
            //   <TableCell component="th" scope="row">
            //     {row.id}
            //   </TableCell>
            //   <TableCell align="right">{row.name}</TableCell>
            //   <TableCell align="right">{row.email}</TableCell>
            //   <TableCell align="right">{row.phone}</TableCell>
            //   <TableCell align="right">
            //     <IconButton onClick={deleteClient}>
            //       <DeleteIcon />
            //     </IconButton>
            //   </TableCell>
            // </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
