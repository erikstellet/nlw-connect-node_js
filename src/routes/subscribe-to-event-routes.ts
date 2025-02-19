import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { subscribeToEvent } from '../functions/subscribe-to-event'

export const subscribeToEventRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/subscriptions',
    {
      schema: {
        body: z.object({
          email: z.string().email(),
          name: z.string(),
        }),
        description: 'Amet in officia ullamco minim dolor.',
        response: {
          201: z.object({
            subscriberId: z.string(),
          }),
        },
        summary: 'Subscribes someone to the event',
        tags: ['subscription'],
      },
    },
    async (request, reply) => {
      const { email, name } = request.body

      const { subscriberId } = await subscribeToEvent({
        email,
        name,
      })

      // Create subscription
      return reply.status(201).send({ subscriberId })
    }
  )
}
