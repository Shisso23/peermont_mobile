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
                        applicationId project.env.get('DYNATRACE_APP_ID')
                        beaconUrl project.env.get('DYNATRACE_BEACON')
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
        <string>[ReactNativeConfig envFor:@"DYNATRACE_APP_ID"]</string>
        <key>DTXBeaconURL</key>
        <string>[ReactNativeConfig envFor:@"DYNATRACE_BEACON"]</string>
        <key>DTXLogLevel</key>
        <string>ALL</string>
        <key>DTXUserOptIn</key>
        <false/>
        <key>DTXStartupLoadBalancing</key>
        <true/>
        `,
  },
};
