module.exports = {
    debugMode: true,
    api: {
      //host: 'http://api.ddgmalto.io',
      host: "http://api.localhost",
      //host: "https://minitwitterapi.reactiveprogramming.io"
    },
    server: {
      port: 8080,
      //  host: "http://api.localhost",
    },
    
    mongodb: {
      development: {
        connectionString:
          'mongodb+srv://vichofeo:bottyfeo02@mytwiter.dhdxm.mongodb.net/myTwiter?retryWrites=true&w=majority',
      },
      production: {
        connectionString:
          'mongodb+srv://vichofeo:bottyfeo02@mytwiter.dhdxm.mongodb.net/myTwiter?retryWrites=true&w=majority',
      },
    },
    jwt: {
      secret: '#$%EGt2eT##$EG%Y$Y&U&/IETRH45W$%whth$Y$%YGRT',
    },
  }
  