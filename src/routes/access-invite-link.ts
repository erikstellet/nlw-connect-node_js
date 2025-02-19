import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

import { env } from '../env'
import { accessInviteLink } from '../functions/access-invite-link'
import { redis } from '../redis/client'

export const accessInviteLinkRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/invites/:subscriberId',
    {
      schema: {
        params: z.object({
          subscriberId: z.string(),
        }),
        description: 'Amet in officia ullamco minim dolor.',
        response: {
          201: z.object({
            subscriberId: z.string(),
          }),
        },
        summary: 'Access invite link nd redirects user',
        tags: ['referral'],
      },
    },
    async (request, reply) => {
      const { subscriberId } = request.params
      await accessInviteLink({ subscriberId })

      console.log(await redis.hgetall('referral:access-count'))

      const redirectURL = new URL(env.WEB_URL)

      redirectURL.searchParams.set('referrer', subscriberId)

      return reply.redirect(redirectURL.toString(), 302)
    }
  )
}
