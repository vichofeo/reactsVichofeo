module.exports = {
  //PORTEP: 8080, 
    debugMode: true,
    api: {
      //host: 'http://api.localhost:8080',
      host: "https://luapp.fly.dev"
    },
    server: {
      port: 8080,
      //  host: "http://api.localhost",
    },
    
    mongodb: {
      development: {
        //mongodb+srv://vichofeo:Bottyfeo%02$#@iadb.ndttbbo.mongodb.net/?retryWrites=true&w=majority
        connectionString:
          'mongodb+srv://vichofeo:uZn2JzXba3dFsbT5@iadb.vwim9km.mongodb.net/?retryWrites=true&w=majority',
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
  