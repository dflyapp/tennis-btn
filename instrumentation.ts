import { NodeSDK } from '@opentelemetry/sdk-node'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node'

export function register() {
  const sdk: NodeSDK = new NodeSDK({
    serviceName: 'tennis-btn-node',
    traceExporter: new OTLPTraceExporter({
      url: 'https://api.honeycomb.io/v1/traces', // US instance
      //url: "https://api.eu1.honeycomb.io/v1/traces", // EU instance
      headers: {
        'x-honeycomb-team': process.env.NEXT_PUBLIC_OTEL_CLIENT || '',
      },
    }),

    instrumentations: [
      getNodeAutoInstrumentations({
        // We recommend disabling fs automatic instrumentation because
        // it can be noisy and expensive during startup
        '@opentelemetry/instrumentation-fs': {
          enabled: false,
        },
      }),
    ],
  })

  sdk.start()
}
