# Confluent (schema registry)

Passo a passo para produzir e consumir mensagens usando o schema registry.

1. Subindo os containers necessários para o funcionamento:
   ```bash
   cd confluent/docker
   docker compose up -d
   ```
2. [Acessando o control center](http://localhost:9021)
3. Criando o tópico necessário
    - Clicar em Topics
    - Clicar em **Add Topic**
    - No campo **Topic Name** informar o nome do tópico
      _confluent_confloss_2024_
    - Clicar em **Create with defaults**
4. Clicar novamente em **Topics** e certifique-se que o novo tópico foi criado.
5. Subir o serviço produtor de mensagens
   ```bash
   cd confluent/src
   ts-node microservices/produce.ts
   ```
6. Produzir mensagens utilizando postman
    - Criar a request do método POST para a url http://localhost:3000
    - Definir o body da request como raw (tipo JSON) com o conteúdo abaixo
      ```json
      {
          "lecture": "Kafka",
          "content": "Usando kafka",
          "speaker": "João Souza",
          "duration": 2
      }
      ```
    - Após enviar a requisição e receber status 200 acessar o tópico _confluent_confloss_2024_ no control center, clicar
      em
      messages e checar se a mensagem foi recebida pelo tópico.
7. Tentando enviar uma mensagem com dados que não respeitam o schema para ver o comportamento
    - Criar a request do método POST para a url http://localhost:3000
    - Definir o body da request como raw (tipo JSON) com o conteúdo abaixo
      ```json
      {
          "lecture": "Kafka",
          "content": "Usando kafka",
          "speaker": "João Souza",
          "duration": 2.5
      }
      ```
    - Após enviar a requisição será recebido um status 400 no postman indicando qual foi a falha, acesse o tópico
      _confluent_confloss_2024_ no control center, clicar em messages e confirmar que a mensagem não foi recebida pelo
      tópico.
8. Consumindo as mensagens produzidas
   ```bash
   cd confluent/src
   ts-node microservices/consume.ts
   ```
   Ao ser executado serão apresentadas na tela informações sobre as mensagens recebidas e consumidas.

[Referência](https://docs.confluent.io/platform/current/platform-quickstart.html#quickstart)
