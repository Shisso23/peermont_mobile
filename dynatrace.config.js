/* eslint-disable no-unused-vars */
module.exports = {
  react: {
    debug: true,

    lifecycle: {
      /**
       * Decide if you want to see Update Cycles as well
       */
      includeUpdate: false,

      /**
       * Filter for Instrumenting Lifecycle of Components / True = Will be instrumented
       */
      instrument: (filename) => {
        return false;
      },
    },

    input: {
      /**
       * Allows you to filter the instrumentation for touch events, refresh events and picker events in certain files
       * True = Will be instrumented
       */
      instrument: (filename) => {
        return true;
      },
    },
  },
  android: {
    // Those configs are copied 1:1
    config: `
        dynatrace {
            configurations {
                defaultConfig {
                    autoStart {
                        applicationId 'f10c3970-8ae9-4b14-a040-f07a1314629b'
                        beaconUrl 'https://bf20365ozt.bf.dynatrace.com/mbeacon'
                    }
                    userOptIn false
                    agentBehavior.startupLoadBalancing true
                }
            }
        }
        `,
  },
  ios: {
    // Those configs are copied 1:1
    config: `
        <key>DTXApplicationID</key>
        <string>f10c3970-8ae9-4b14-a040-f07a1314629b</string>
        <key>DTXBeaconURL</key>
        <string>https://bf20365ozt.bf.dynatrace.com/mbeacon</string>
        <key>DTXLogLevel</key>
        <string>ALL</string>
        <key>DTXUserOptIn</key>
        <false/>
        <key>DTXStartupLoadBalancing</key>
        <true/>
        `,
  },
};
