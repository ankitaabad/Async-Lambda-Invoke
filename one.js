//@ts-check

const express = require('express');
const serverless = require('serverless-http');
const app = express();
const aws = require("aws-sdk");
const casual = require('casual');
const lambda = new aws.Lambda({
  apiVersion: "2015-03-31",
  endpoint: `lambda.${process.env.REGION}.amazonaws.com`
});
const async_lambda_invoke = async ({ function_name, payload }) => {
  console.log(payload);
    const FunctionName = `${process.env.FUNCTION_PREFIX}-${function_name}`;
    console.log(process.env.REGION);
    console.log(`invoking function: ${FunctionName}`);
    const result = await lambda
      .invoke({
        FunctionName,
        InvocationType: "Event",
  
        Payload: JSON.stringify(payload)
        
      })
      .promise();
    console.log(`${FunctionName} invoked`, result);
  };


app.get("/invoke",async(req,res) => {
    const payload = casual.card_data; 
    await async_lambda_invoke({function_name:'lambda-two',payload})
    res.send("SUCCESS");
})
const handler = serverless(app);
module.exports =  {handler};
