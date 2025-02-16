// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'
import { SupabaseClient } from '@supabase/supabase-js'
import { supabaseIntegration } from '@supabase/sentry-js-integration'

// import { NodeSDK } from '@opentelemetry/sdk-node'
// import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
// import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node'

// Send traces to Sentry
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

// Sending traces to Honeycomb
// const sdk: NodeSDK = new NodeSDK({
//   serviceName: 'tennis-btn-node',
//   traceExporter: new OTLPTraceExporter({
//     url: 'https://api.honeycomb.io/v1/traces', // US instance
//     //url: "https://api.eu1.honeycomb.io/v1/traces", // EU instance
//     headers: {
//       'x-honeycomb-team': process.env.HONEYCOMB_API_KEY || '',
//     },
//   }),

//   instrumentations: [
//     getNodeAutoInstrumentations({
//       // We recommend disabling fs automatic instrumentation because
//       // it can be noisy and expensive during startup
//       '@opentelemetry/instrumentation-fs': {
//         enabled: false,
//       },
//     }),
//   ],
// })

// sdk.start()
// endHoneycomb
