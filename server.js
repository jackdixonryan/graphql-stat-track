const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const fetch = require('node-fetch');

const schema = buildSchema(`
  type Query {
    hello: String
    user: User
  }
  type User {
    name: String!
    magic: Int!
    questsstarted: Int!
    questscomplete: Int!
    questsnotstarted: Int!
    totalxp: Int!
    ranged: Int!
    melee: Int!
    rank: String!
    combatlevel: Int!
    loggedIn: String!
    activities: [Activity]
    skillvalues: [SkillValue]
  }
  type Activity {
    date: String!
    details: String!
    text: String!
  }
  type SkillValue {
    level: Int!
    xp: Int!
    rank: Int!
    id: Int!
  }
`);

const url = `https://apps.runescape.com/runemetrics/profile/profile?user=%22Sala%20San%22`;



const root = {
  hello: () => {
    return 'Hello World!';
  },
  user: () => {
    return fetch(url).then(res => {
      return res.json();
    })
  }
};

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(8001);
console.log('running graphql server on port 8001')