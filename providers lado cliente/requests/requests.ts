import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiProvider } from '../api/api';
import { UserProvider } from '../user/user';

declare var AWS: any;

@Injectable()
export class RequestsProvider {

  sqs: any;

  constructor(public api: ApiProvider, public user: UserProvider) {
    // AWS.config.update('sa-east-1')
    var accessKeyId = localStorage.getItem('accessKeyId');

    var secretAccessKey = localStorage.getItem('secretAccessKey');    
    
    this.sqs = new AWS.SQS({apiVersion: '2012-11-05', region: 'sa-east-1', accessKeyId: accessKeyId, secretAccessKey: secretAccessKey})
    
  }
  
  /**
 * Método responsável por retornar as requisições de serviçoes de assistência feitas pelo usuário
 * @returns {List}
 */
  public getRequests() {
    return this.api.get('requests/', this.user._token);
  }

  
  /**
 * Método responsável por criar uma requisição de um chamado de um usuário
 * @returns {Object}
 */
  public createRequest(request: any) {
    var params = {
      DelaySeconds: 0,
      MessageAttributes: {
       "type": {
         DataType: "String",
         StringValue: request.type
        },
       "latitude": {
         DataType: "Number",
         StringValue: request.latitude.toString()
        },
       "longitude": {
         DataType: "Number",
         StringValue: request.longitude.toString()
        },
        "userId": {
          DataType: "String",
          StringValue: this.user.user._id
        }
      },
      MessageBody: request.type,
      QueueUrl: "https://sqs.sa-east-1.amazonaws.com/672804215101/Fila"
     };
    this.sqs.sendMessage(params, function(err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data.MessageId);
      }
    });
    return this.api.post('requests/', request, this.user._token)
  }

}
