const _ = require('lodash');

const contact = require('../models/contactModel');
const task = require('../models/taskModel');

let {
  // These are the basic GraphQL types need in this tutorial
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLBoolean,
  // This is used to create required fileds and arguments
  GraphQLNonNull,
  // This is the class we need to create the schema
  GraphQLSchema,
} = require('graphql');

const ContactsType = new GraphQLObjectType({
  name: "Contact",
  description: "This represent an contact",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    department: { type: new GraphQLNonNull(GraphQLString) },
    employeeId: { type: new GraphQLNonNull(GraphQLString) }
  })
});

const TaskType = new GraphQLObjectType({
  name: "Contact",
  description: "This represent an contact",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    task: { type: new GraphQLNonNull(GraphQLString) },
    isCompleted: { type: new GraphQLNonNull(GraphQLBoolean) }
  })
})

const ContactsQueryRootType = new GraphQLObjectType({
  name: 'AppSchema',
  description: "Application Schema Root",
  fields: () => ({
    contacts: {
      type: new GraphQLList(ContactsType),
      description: "List of all Contacts",
      resolve: () => {
        var contactsItem = new Promise((resolve, reject) => {
          contact.find((err, contacts) => {
            err ? reject(err) : resolve(contacts)
          })
        })
        return contactsItem
      }
    },
  }),
  // addUser: (root, { id, firstName, lastName }) => {

  //   resolve:()=>{ 
  //     const newContact = new contact({ id, firstName, lastName });
  //     var abc = new Promise((resolve, reject) => {
  //     newContact.save((err, res) => {
  //       err ? reject(err) : resolve(res);
  //     });
  //   }
  //   });
  // }
});

const AppSchema = new GraphQLSchema({
  query: ContactsQueryRootType
});

module.exports = AppSchema;