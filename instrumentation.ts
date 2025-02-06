import { NodeSDK, logs } from '@opentelemetry/sdk-node'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node'

export function register() {
  const sdk: NodeSDK = new NodeSDK({
    traceExporter: new OTLPTraceExporter(),

    // send logs to Honeycomb
    // logRecordProcessor: new logs.SimpleLogRecordProcessor(
    //   new OTLPLogExporter()
    // ),

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
