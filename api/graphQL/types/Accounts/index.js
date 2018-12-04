export default `
  type Account {
    username: String!
  }

  type responseLogin {
    token:String
    status:Boolean!
  }

  type Mutation {
    signup( username: String!,firstname:String!,lastname:String!,password: String!): Boolean
    login( username: String!,password: String!):responseLogin
  }
`;