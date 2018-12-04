export default `
  type Contact {
    id: Int!
    firstName: String!
    lastName: String!
    employeeId:String!
  }
  type Query {
    contacts: [Contact]
  }
  type Mutation {
    addContact(id: Int!, firstName: String!, lastName: String!,employeeId:String!): Contact
  }
`;