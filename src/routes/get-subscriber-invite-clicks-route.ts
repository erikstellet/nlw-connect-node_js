import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

import { getSubscriberInviteClicks } from '../functions/get-subscriber-invite-clicks'

export const getSubscriberInviteClicksRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/subscribers/:subscriberId/ranking/clicks',
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
          summary: 'Get subscribers invite clicks count',
          tags: ['referral'],
        },
      },
      async request => {
        const { subscriberId } = request.params
        const { count } = await getSubscriberInviteClicks({ subscriberId })

        return { count }
      }
    )
  }
