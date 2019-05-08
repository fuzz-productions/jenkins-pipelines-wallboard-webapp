injectDeploymentVars("monitor.fuzzhq.com")
prettyNode("jenkins-ecs") {
    yarn.installAndSetup()
    yarn.build()
    if (env.IS_PRODUCTION == "true") {
        postStage("Deploy") {
            publishHTML([allowMissing         : true,
                         alwaysLinkToLastBuild: false,
                         keepAll              : false, reportDir: "build",
                         reportFiles          : "index.html",
                         reportName           : "Jenkins Build Monitor",
                         reportTitles         : ""])
        }
    }
}
