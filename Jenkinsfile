injectDeploymentVars("monitor.fuzzhq.com")
prettyNode("ubuntu-stock") {
    yarn.installAndSetup()
    dotEnv("monitor-env-file") {
        yarn.build()
    }
    if (env.IS_PRODUCTION == "true") {
        postStage("Deploy") {
            s3 bucket: "${env.DEPLOY_URL}", sourceFile: 'build/*', profileName: 'jenkins-monitor'
            publishLink()
        }
    }
}
