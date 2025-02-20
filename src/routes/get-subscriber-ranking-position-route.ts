import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

import { GetSubscriberRankingPosition } from '../functions/get-subscriber-ranking-position'

export const getSubscriberRankingPositionRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/subscribers/:subscriberId/ranking/position',
      {
        schema: {
          params: z.object({
            subscriberId: z.string(),
          }),
          description: 'Amet in officia ullamco minim dolor.',
          response: {
            200: z.object({
              position: z.number().nullable(),
            }),
          },
          summary: 'Get subscribers invite clicks count',
          tags: ['referral'],
        },
      },
      async request => {
        const { subscriberId } = request.params
        const { position } = await GetSubscriberRankingPosition({
          subscriberId,
        })

        return { position }
      }
    )
  }
