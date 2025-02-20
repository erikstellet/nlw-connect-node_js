import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

import { env } from '../env'
import { accessInviteLink } from '../functions/access-invite-link'

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
          302: z.null(),
        },
        summary: 'Access invite link nd redirects user',
        tags: ['referral'],
      },
    },
    async (request, reply) => {
      const { subscriberId } = request.params

      await accessInviteLink({ subscriberId })

      const redirectURL = new URL(env.WEB_URL)

      redirectURL.searchParams.set('referrer', subscriberId)

      return reply.redirect(redirectURL.toString(), 302)
    }
  )
}
