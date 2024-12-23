"use strict";
const AWS = require("aws-sdk");
const ses = new AWS.SES();

module.exports.createContact = async (event, context) => {
  console.log("Recived:::", event);
  const {to, from , subject, message} = JSON.parse(event.body);

  if (!to || !from || !subject || !message){
    return{
      statusCode: 400,
      body: JSON.stringify({message: "to or from... are not set properly"})
    };
  }
  const params = {
    Destination: {
      ToAddresses:[to]
    },
    Message: {
      Body: {
        Text: {Data : message},
      },
      Subject: {Data : subject},
    },
    Source: from
  };
  try{
    await ses.sendEmail(params).promise();
    return{
      statusCode: 200,
      body: JSON.stringify({message:"email sent succesfully!", 
        success: true,
      }),
    };
  }catch (error){
    return{
      statusCode: 400,
      body: JSON.stringify({message:"email unsuccesful.", 
        success: true,
      }),
    };
  }
};