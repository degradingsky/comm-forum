/**
 * New Relic agent configuration.
 *
 * See lib/config/default.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */
exports.config = {
  /**
   * Whether the module is enabled.
   */
  agent_enabled: process.env.NR_AGENT_ENABLED === "true",
  /**
   * Array of application names.
   */
  app_name: [`FarmasortDataService-${process.env.NODE_CONFIG_ENV}`],
  /**
   * Your New Relic license key.
   */
  license_key: process.env.NR_LICENSE_KEY,
  /**
   * Labels
   *
   * An object of label names and values that will be applied to the data sent
   * from this agent. Both label names and label values have a maximum length of
   * 255 characters. This object should contain at most 64 labels.
   */
  labels: `environment:${process.env.NODE_CONFIG_ENV}; domain:fulfillment; team:nebula; framework:nodejs; cost-center:745012;
  service:farma-sort-data-service; product:shipping; contact:LogisticsOpsNebulaSquad@cimpress.com; `,
  logging: {
    /**
     * Level at which to log. 'trace' is most useful to New Relic when diagnosing
     * issues with the agent, 'info' and higher will impose the least overhead on
     * production applications.
     */
    level: "error",
    filepath: "stdout",
  },
  /**
   * When true, all request headers except for those listed in attributes.exclude
   * will be captured for all traces, unless otherwise specified in a destination's
   * attributes include/exclude lists.
   */
  allow_all_headers: true,
  attributes: {
    /**
     * Prefix of attributes to exclude from all destinations. Allows * as wildcard
     * at end.
     *
     * NOTE: If excluding headers, they must be in camelCase form to be filtered.
     *
     * @name NEW_RELIC_ATTRIBUTES_EXCLUDE
     */
    exclude: [
      "request.headers.cookie",
      "request.headers.authorization",
      "request.headers.proxyAuthorization",
      "request.headers.setCookie*",
      "request.headers.x*",
    ],
  },
  rules: {
    ignore: ["^/socket.io/.*/xhr-polling/", ".*/livecheck.*", "*/swagger.*"],
  },
  application_logging: {
    forwarding: {
      enabled: false,
    },
    local_decorating: {
      enabled: true,
    },
  },
};
