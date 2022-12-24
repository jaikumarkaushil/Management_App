const { projects, clients } = require('../sampleData.js');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull } = require('graphql');
const Project = require('../models/Project');
const Client = require('../models/Client');

const clientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString }
    })
});

const projectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        clientId: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString }, 
        status: { type: GraphQLString },
        client: {
            type: clientType,
            resolve(parent, args) {
                return Client.findById(parent.clientId).lean();
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        projects: {
            type: new GraphQLList(projectType),
            resolve(parent, args) {
                return Project.find().lean();
            }
        },
        project: {
            type: projectType,
            args: { id: { type: GraphQLID}},
            resolve(parent, args) {
                return Project.findById(args.id).lean();
            }
        },
        clients: {
            type: new GraphQLList(clientType),
            resolve(parent, args) {
                return Client.find().lean();
            }
        },
        client: {
            type: clientType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Client.findById(args.id).lean();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
