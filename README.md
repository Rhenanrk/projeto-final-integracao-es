### Comunicação usando Amazon SQS

* Interface de envio de mensagens (cliente): 
  * ```providers lado cliente/requests/requests.ts```    
  
* Interface de recebimento de mensagens (servidor): 
  * ```provider lado do servidor/requestsListener.ts```    
  
* Descrição da forma de comunicação   
    * Neste trabalho, foi utilizado a biblioteca de enfileiramento de mensagens Amazon SQS (Simple Queue Service), entre um cliente e servidor.
    
### Contexto da aplicação    
 * As bibliotecas disponíveis neste repositório implementam a integração entre uma aplicação que realiza chamadas de suporte técnico automotivo (lado cliente), enviando as requisições a uma fila no servidor (que utiliza Amazon SQS) onde são desenfileiradas e enviadas para uma aplicação web.   
* As requisições contém coordenadas geográficas (longitude e latitude) e uma chamada específica do tipo de pane que o automóvel do usuário apresentou. Essas informações são enviadas como mensagem ao servidor e formam uma pilha, que posteriormente serão enviadas para outra aplicação que irá tratá-las.
