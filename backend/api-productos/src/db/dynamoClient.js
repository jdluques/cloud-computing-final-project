db/dynamoClient.js

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = {
  async put(tableName, item, options = {}) {
    return dynamoDb.put({ TableName: tableName, Item: item, ...options }).promise();
  },
  async get(tableName, key) {
    return dynamoDb.get({ TableName: tableName, Key: key }).promise();
  },
  async query(params) {
    return dynamoDb.query(params).promise();
  },
  async scan(params) {
    return dynamoDb.scan(params).promise();
  },
  async delete(tableName, key) {
    return dynamoDb.delete({ TableName: tableName, Key: key }).promise();
  },
};
