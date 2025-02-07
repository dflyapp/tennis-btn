// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'
import { SupabaseClient } from '@supabase/supabase-js'
import { supabaseIntegration } from '@supabase/sentry-js-integration'

Sentry.init({
  dsn: 'https://84c432c12182e6366b6a2d777cd695f7@o4508776494792704.ingest.us.sentry.io/4508776501084160',

  integrations: [
    // Supabase integration
    supabaseIntegration(SupabaseClient, Sentry, {
      tracing: true,
      breadcrumbs: true,
      errors: true,
    }),
    Sentry.nativeNodeFetchIntegration({
      breadcrumbs: true,
      ignoreOutgoingRequests: (url) => {
        return url.startsWith(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest`)
      },
    }),
  ],

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
})
