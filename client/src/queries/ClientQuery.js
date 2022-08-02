import { gql } from "@apollo/client";

const GET_CLIENTS = gql`
  query getClient {
    clients {
      id
      name
      email
      phone
    }
  }
`;

export { GET_CLIENTS };
