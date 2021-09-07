# Prisma1 Template

![](https://img.shields.io/badge/staus-success-green.svg) ![](https://img.shields.io/badge/Shield_layer-🛡🛡🛡🛡🛡-gold.svg) ![](https://img.shields.io/badge/yarn-v1.21.1-pink.svg) ![](https://img.shields.io/badge/Nodejs-v10.22-lemon.svg) ![](https://img.shields.io/badge/GraphQL-v14.1.1-pink.svg) ![](https://img.shields.io/badge/Prisma-v1.34.10-lemon.svg)

----

<div align="center"><img src="https://imgur.com/1MfnLVl.png" /><img src="https://imgur.com/DX1VKtn.png" width="70" /></div>

## Caracteristicas

- **Scalable GraphQL server:** The server uses [`graphql-yoga`](https://github.com/prisma/graphql-yoga) which is based on Apollo Server & Express
- **Static type generation**: TypeScript types for GraphQL queries & mutations are generated in a build step
- **Authentication**: Signup and login workflows are ready to use for your users
- **GraphQL database:** Includes GraphQL database binding to [Prisma](https://www.prismagraphql.com) (running on MongoDB)
- **Tooling**: Out-of-the-box support for [GraphQL Playground](https://github.com/prisma/graphql-playground) & [query performance tracing](https://github.com/apollographql/apollo-tracing)
- **Extensible**: Simple and flexible [data model](./database/datamodel.graphql) – easy to adjust and extend
- **No configuration overhead**: Preconfigured [`graphql-config`](https://github.com/prisma/graphql-config) setup
- **Realtime updates**: Support for GraphQL subscriptions
- **Custom Permissions**: Added layer authorization for all methods on `GraphQL` 

## Requerimientos
* NodeJS v10.+
* Yarn v1.21.+
* Docker v19.03.13

## Instalando

Necesitas instalar todas las siguientes dependencias :

> Para mas de detalles de instalación de `Prisma1` visita [Prisma1 Docs](https://v1.prisma.io/docs/1.34/get-started/01-setting-up-prisma-new-database-TYPESCRIPT-t002/)

```sh
$ yarn install
```

```sh
#pre
configurar entorno creando archivo .env
# 1. Situarse en el directorio de prisma
$ cd ./project  
# 2. Crear los contenedores necesarios
$ cd  docker-compose up -d
# 3. Realizar el deploy de prisma en el servicio `http://localhost:4466`
$ prisma deploy
# 4. Realizar la primera carga de datos con el archivo `seed.graphql`
$ prisma seed
```

para mas detalles consulta [Aquí](https://v1.prisma.io/docs/1.34/get-started/01-setting-up-prisma-new-database-TYPESCRIPT-t002/)

### Iniciando el Servicio
```sh
# Server start (corre en http://localhost:4000) y abre GraphQL Playground
$ yarn start
```

![](https://imgur.com/hElq68i.png)

## Documentation

### Commands

* `$ yarn start` starts GraphQL server on `http://localhost:4000`
* `$ prisma <subcommand>` gives access to local version of Prisma CLI (e.g. `yarn prisma deploy`)

> **Note**: We recommend that you're using `yarn dev` during development as it will give you access to the GraphQL API or your server (defined by the [application schema](./src/schema.graphql)) as well as to the Prisma API directly (defined by the [Prisma database schema](./generated/prisma.graphql)). If you're starting the server with `yarn start`, you'll only be able to access the API of the application schema.

### Project structure

| File name                     | Description 　　　　　　　　                                                  |
|-------------------------------|-------------------------------------------------------------------------------|
| ├── .env                      | Define las variables de entorno                                               |
| ├── .graphqlconfig.yml        | Configuration file based on graphql-config (e.g. used by GraphQL Playground). |
| └── prisma (directory)        | Contains all files that are related to the Prisma database service            |
| ├── docker-compose.yml        | Define la creación de servicios con Docker                                    |
| ├── prisma.yml                | The root configuration file for your Prisma database service (docs)           |
| └── models (directory)        | Defines your data model (written in GraphQL SDL)                              |
| └── src (directory)           | Contains the source files for your GraphQL server                             |
| ├── index.ts                  | The entry point for your GraphQL server                                       |
| ├── schema.graphql            | The application schema defining the API exposed to client applications        |
| ├── resolvers (directory)     | Contains the implementation of the resolvers for the application schema       |
| └── types (directory)         | Define los tipos previamente creados y enlazados a generated                  |
| └── generated (directory)     | Contains generated files                                                      |
| └── prisma-client (directory) | The generated Prisma client                                                   |


## Modelos

> Breve descripción de los modelos que componen el template

|     Model     |       FileName       |                     description                     |     hasRelations    |
|:-------------:|:--------------------:|:---------------------------------------------------:|:-------------------:|
| `User`          | user.prisma          | Usuario que interactua en el sistema                |  |
## Contributors

Gracias a estas increibles personas ([emoji key](https://github.com/all-contributors/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/enriqueao"><img src="https://avatars2.githubusercontent.com/u/20671244?s=460&v=4" width="100px;" alt="Enrique Aguilar"/><br /><sub><b>Enrique Aguilar</b></sub></a><br /><a href="#code" title="code">💻📖🤔🔌⚠️📓 </a></td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->
<!-- 
This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome! -->