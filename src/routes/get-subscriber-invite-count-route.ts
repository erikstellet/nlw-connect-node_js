import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

import { GetSubscriberInviteCount } from '../functions/get-subscriber-invite-count'

export const getSubscriberInviteCountRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/subscribers/:subscriberId/ranking/count',
      {
        schema: {
          params: z.object({
            subscriberId: z.string(),
          }),
          description: 'Amet in officia ullamco minim dolor.',
          response: {
            200: z.object({
              count: z.number(),
            }),
          },
          summary: 'Get subscribers invite count',
          tags: ['referral'],
        },
      },
      async request => {
        const { subscriberId } = request.params
        const { count } = await GetSubscriberInviteCount({ subscriberId })

        return { count }
      }
    )
  }
