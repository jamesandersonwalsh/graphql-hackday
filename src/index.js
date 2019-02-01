import { ApolloServer, gql } from 'apollo-server'

// This is a (sample) collection of team members we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
const fakeEmpireDatabaseData = [
  {
    firstName: 'James',
    lastName: 'Walsh',
    role: "Developer",
    catchPhrase: "What a time to be alive...",
    estimatedTimeTillNextBurpInMinutes: 25,
    isAwesome: true
  },
  {
    firstName: 'Kaiden',
    lastName: 'Rawlinson',
    role: "Tech Lead",
    catchPhrase: `I said treat yo'self, not let yo'self go!`,
    estimatedTimeTillNextBurpInMinutes: 999999,
    isAwesome: true
  },
  {
    firstName: 'Bressain',
    lastName: 'Dinkelman',
    role: "Former Tech Lead",
    catchPhrase: "The lesson is... never try.",
    estimatedTimeTillNextBurpInMinutes: 5,
    isAwesome: true
  },
  {
    firstName: 'Zach',
    lastName: 'Walton',
    role: "Developer",
    catchPhrase: "I'll make my own destiny. Believe it!",
    estimatedTimeTillNextBurpInMinutes: null,
    isAwesome: true
  },
  {
    firstName: 'Isaac',
    lastName: 'Stennett',
    role: "Developer",
    catchPhrase: null,
    estimatedTimeTillNextBurpInMinutes: null,
    isAwesome: true
  },
  {
    firstName: 'Cole',
    lastName: 'Quartuccio',
    role: "Designer",
    catchPhrase: "Does that fit within an 8 pixel grid?",
    estimatedTimeTillNextBurpInMinutes: null,
    isAwesome: true
  },
  {
    firstName: 'Dave',
    lastName: 'Rackham',
    role: "Product Manager",
    catchPhrase: null,
    estimatedTimeTillNextBurpInMinutes: null,
    isAwesome: true
  }
]

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the

  # This "DevStarMember" type can be used in other type declarations.
  type DevStarMember {
    firstName: String!
    lastName: String!
    role: String!
    catchPhrase: String
    estimatedTimeTillNextBurpInMinutes: Int
    isAwesome: Boolean
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    empire: [DevStarMember]
  }
`

function getEmpireCommand() {
  return fakeEmpireDatabaseData
}

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    empire: getEmpireCommand,
  }
}

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers })

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
