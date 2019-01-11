injectDeploymentVars("monitor.fuzzhq.com")
prettyNode("ubuntu-stock") {
    yarn.installAndSetup()
    dotEnv("monitor-env-file") {
        yarn.build()
    }
    if (env.IS_PRODUCTION == "true") {
        postStage("Deploy") {
            awsCreds('monitor-s3-key') {
                bash "sh deploy.sh ${env.DEPLOY_URL}"
            }
            publishLink()
        }
    }
}
