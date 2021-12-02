const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");
const { MONGODB } = require("./config.js");
const User = require("./models/User");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    password: String!
    email: String
    name: String
    createdAt: String
  }
  type Query {
    Hello: String!
    getUsers: [User!]
  }
`;

const resolvers = {
  Query: {
    Hello: (parent, args, context) => "zaa warudoo",

    async getUsers() {
      try {
        const users = await User.find();
        return users;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("mongodb connected");
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`server running at ${res.url}`);
  });
