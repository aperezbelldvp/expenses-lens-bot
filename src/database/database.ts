import { IDatabaseClient } from "../interfaces/IDatabaseClient";
import { PrismaDatabaseClient } from "./PrismaDatabaseClient";

// * If the DB is changed in the future, it will only be changed here
const databaseClient: IDatabaseClient = new PrismaDatabaseClient();

export default databaseClient;
