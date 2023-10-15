import fastify from "fastify";
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts'
// import { signinSchema } from "./schemas/signin";

const signinSchema = {
  querystring: {
    type: 'object',
    properties: {
      username: { type: 'string' },
      password: { type: 'string' },
    },
    required: ['username', 'password']
  }
}

const PORT = 8080
const ENVIRONMENT = "development"

const envToLogger = {
  development: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
  production: true,
  test: false,
}

const server = fastify({
  logger: envToLogger[ENVIRONMENT]
}).withTypeProvider<JsonSchemaToTsProvider>()


interface IQuerystring {
  username: string;
  password: string;
}

interface IHeaders {
  'h-Custom': string;
}

interface IReply {
  200: { success: boolean, body?: any };
  302: { url: string };
  '4xx': { error: string };
}

server.get<{
  Querystring: IQuerystring,
  Headers: IHeaders,
  Reply: IReply
}>('/auth', {
  schema: signinSchema,
}, async (request, reply) => {

  const { username, password } = request.query
  const customerHeader = request.headers['h-Custom']

  reply.code(200).send({ success: true, body: `Logged in as ${username} with password ${password}` });

  return reply
})

try {
  await server.listen({
    port: PORT
  })
} catch (error) {
  server.log.error(error)
  process.exit(1)
}