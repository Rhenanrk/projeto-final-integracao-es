### Comunicação usando Amazon SQS

* Interface de envio de mensagens (cliente): 
  * ```providers lado cliente/requests/requests.ts```    
  
* Interface de recebimento de mensagens (servidor): 
  * ```provider lado do servidor/requestsListener.ts```    
  
* Descrição da forma de comunicação   
    * Neste trabalho, foi utilizado a biblioteca de enfileiramento de mensgens Amazon SQS (Simple Queue Service), entre um cliente e servidor
