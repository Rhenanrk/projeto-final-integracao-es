// carrega o AWS SDK do Node.js
var AWS = require('aws-sdk');
// Configura a região 
AWS.config.update({region: 'sa-east-1'});

var accessKeyId = localStorage('accessKeyId');

var secretAccessKey = localStorage('secretAccessKey');

var queueURL = localStorage('queueURL');

// Criar um objeto do tipo SQS service
this.sqs = new AWS.SQS({apiVersion: '2012-11-05', region: 'sa-east-1', accessKeyId: accessKeyId, secretAccessKey: secretAccessKey})

var queueURL = queueURL;

var params = {
 AttributeNames: [
    "SentTimestamp"
 ],
 MaxNumberOfMessages: 1,
 MessageAttributeNames: [
    "All"
 ],
 QueueUrl: queueURL,
 VisibilityTimeout: 0,
 WaitTimeSeconds: 0
};

/**
 * Método responsável por receber as requisições que estão aguardando na lista do SQS
 * @returns {Void}
 */
sqs.receiveMessage(params, function(err, data) {
  if (err) {
    console.log("Receive Error", err);
  } else if (data.Messages) {
    var deleteParams = {
      QueueUrl: queueURL,
      ReceiptHandle: data.Messages[0].ReceiptHandle
    };
    sqs.deleteMessage(deleteParams, function(err, data) {
      if (err) {
        console.log("Delete Error", err);
      } else {
        console.log("Message Deleted", data);
      }
    });
  }
});
