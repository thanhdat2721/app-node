import { mergeResolvers } from "merge-graphql-schemas";

import Contact from "./Contacts";
import Account from './Accounts';

const resolvers = [Contact, Account];

export default mergeResolvers(resolvers);