const Promise = require('promise');
const { hystrixConfig, commandFactory } = require('hystrixjs');



hystrixConfig.init({
  'hystrix.promise.implementation': Promise,
  'hystrix.circuit.sleepWindowInMilliseconds': parseInt(process.env.HYSTRIX_SLEEP_TIME || 30000, 10) || 30000,
  'hystrix.circuit.errorThresholdPercentage': parseInt(process.env.HYSTRIX_ERROR_THRESHOLD_PERCENTAGE || 50, 10) || 0,
  'hystrix.execution.timeoutInMilliseconds': parseInt(process.env.HYSTRIX_TIMEOUT || 20000, 10) || 30000,
  'hystrix.force.circuit.open': process.env.HYSTRIX_CIRCUIT_OPEN === 'true',
  'hystrix.circuit.volumeThreshold': parseInt(process.env.HYSTRIX_VOLUME_THRESHOLD || 2, 10) || 10,
});


const hystrixRequestHandler = (responseHandler, name) => (
  commandFactory.getOrCreate(name)
    .run(responseHandler)
    .fallbackTo(() => { 
     throw new Error('HYSTRIX-FALLBACK');
    })
    .build()
);

module.exports = { hystrixRequestHandler };
