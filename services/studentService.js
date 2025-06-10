import dbClient from "../db.js";
import { v4 as uuid } from "uuid";
import {
  ScanCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";

const TABLE_NAME = "Students";

const getAllStudents = async () => {
  const data = await dbClient.send(new ScanCommand({ TableName: TABLE_NAME }));
  return data.Items || [];
};

const createStudent = async (student) => {
  const user = { id: uuid(), ...student };

  await dbClient.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: user,
    })
  );
  return user;
};

const getStudentById = async (id) => {
  console.log({ id });
  const data = await dbClient.send(
    new QueryCommand({
      TableName: TABLE_NAME,
      KeyConditionExpression: "id = :id_val",
      ExpressionAttributeValues: {
        ":id_val": id,
      },
    })
  );

  if (data?.Items.length == 0) {
    throw new Error("User not found", "NOT_FOUND");
  }

  return data.Items[0];
};

const updateStudent = async (id, student) => {
  const { name, email } = student;
  const data = await dbClient.send(
    new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { id, email },
      UpdateExpression: "set #name = :name",
      ExpressionAttributeNames: {
        "#name": "name"
      },
      ExpressionAttributeValues: {
        ":name": name
      },
      ReturnValues: "ALL_NEW",
    })
  );
  return data.Attributes;
};

const deleteStudent = async (id,email) => {
  return await dbClient.send(
    new DeleteCommand({
      TableName: TABLE_NAME,
      Key: { id,email },
    })
  );
};

export {
  getAllStudents,
  createStudent,
  getStudentById,
  updateStudent,
  deleteStudent,
};
