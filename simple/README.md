# Confluent (schema registry)

Passo a passo para produzir e consumir mensagens usando o kafka puro.

1. Subindo os containers necessários para o funcionamento:
   ```bash
   cd simple/docker
   docker compose up -d
   ```
2. Subir o serviço produtor de mensagens
   ```bash
   cd simple/src
   ts-node microservices/produce.ts
   ```
3. Produzir mensagens utilizando postman
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
      ###### _OBS: Aqui não importa o conteúdo da mensagem, pois estamos usando o kafka puro._
    - Após enviar a requisição e receber status 200 acessar o tópico _confloss_simple_topic_ no control center, clicar
      em
      messages e checar se a mensagem foi recebida pelo tópico.
4. Consumindo as mensagens produzidas
   ```bash
   cd simple/src
   ts-node microservices/consume.ts
   ```
   Ao ser executado serão apresentadas na tela informações sobre as mensagens recebidas e consumidas.

[Referência](https://docs.confluent.io/platform/current/platform-quickstart.html#quickstart)
