import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "us-east-1" }); // change region if needed
const ddbDocClient = DynamoDBDocumentClient.from(client);

export default ddbDocClient;
