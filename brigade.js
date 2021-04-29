// const { events, Job, Group } = require("brigadier")
// const { BuildTaskFactory, DeployTaskFactory, ApprovalTaskFactory, PackageTaskFactory } = require("devops-brigade")

// class JobFactory {

//   createBuildJob(e, project) {
//     // TODO: If not "node", specify alternative docker container for your build
//     var build = new Job("build", "node:10.15.0-slim")
//     build.storage.enabled = true

//     let taskFactory = new BuildTaskFactory(e, project)
//     let extractUniqueDatabase = "`cat /mnt/brigade/share/unitTestDatabase.txt`"
//     let mongoPattern = `mongodb://${project.secrets.unittest_mongo_user}:${project.secrets.unittest_mongo_pass}@${project.secrets.team_name}-mdb-mongodb.${project.secrets.team_name}.svc.cluster.local:27017/${extractUniqueDatabase}`
//     build.tasks = [
//       "cd /src",
//       "apt-get update && apt-get --assume-yes install git-core",

//       taskFactory.gitVersion(),

//       // TODO: Remove npmVersion if NOT a node project
//       taskFactory.npmVersion(),

//       "git config --global credential.helper 'store --file ~/.git-credentials'",
//       `echo https://${project.secrets.giteauser}:${project.secrets.giteapass}@gitea-tooling.az.devops.gdpdentsu.net > ~/.git-credentials`,
//       `echo \n >> ~/.git-credentials`,
//       `echo https://${project.secrets.giteauser}:${project.secrets.giteapass}@gitea-tooling.az.globaldevops.gdpdentsu.net >> ~/.git-credentials`,
//       "npm install",
//       "npm run build",
//       // Lint
//       // "npm run lint",
//       // `npm run test:c || true`,
//       taskFactory.storeBuild()
//     ]

//     return build;
//   }
//   createUnitTestJob(e, project) {
//     var unitTest = new Job("unit-test", "node:10.15.0-slim")
//     unitTest.storage.enabled = true

//     let taskFactory = new TaskFactory(e, project)
//     unitTest.tasks = [
//       "rm -rf /src/*",
//       "cd /src",
//       taskFactory.retrieveBuild(),
//       "cat /src/test-report.xml  | grep -q '<failure' && { echo \"Unit tests failed\"; exit 2; } || { echo \"Unit tests passed\"; exit 0; }",
//     ]

//     return unitTest;
//   }
//   dropUnitTestDBJob(e, project) {
//     var unitTestDBDrop = new Job("unit-test-drop-db", "globaldevopsreg11.azurecr.io/builder:latest")
//     unitTestDBDrop.storage.enabled = true
//     let extractUniqueDatabase = "`cat /mnt/brigade/share/unitTestDatabase.txt`"
//     let taskFactory = new DeployTaskFactory(project.secrets.team_name, e, project)
//     unitTestDBDrop.tasks = [
//       taskFactory.loginToCluster(),
//         `export MONGO_POD=$(kubectl get pods -n ${project.secrets.team_name} | grep mongodb | awk '{print $1}')`,
//         `kubectl exec -t $MONGO_POD \
//           -n ${project.secrets.team_name} \
//           -- mongo ${extractUniqueDatabase} -u root -p ${project.secrets.unittest_mongo_root_pass} \
//           --authenticationDatabase admin \
//           --eval "db.dropDatabase()"  || \
//         echo Failed to drop DB`,
//     ]

//     return unitTestDBDrop;
//   }

//   createStaticAnalysisJob(e, project) {
//     var staticAnalysis = new Job("static-analysis", "node:10.15.0-slim")
//     staticAnalysis.storage.enabled = true

//     let taskFactory = new TaskFactory(e, project)
//     staticAnalysis.tasks = [
//       // Using https://www.npmjs.com/package/jest-sonar-reporter
//       "npm install -g sonarqube-scanner",
//       "rm -rf /src/*",
//       "echo app is $APP_NAME",
//       "cd /src",
//       taskFactory.retrieveBuild(),
//       // https://github.com/gotwarlost/istanbul/pull/771
//       "sed -i 's|SF:/src/src|SF:src|g' coverage/lcov.info",
//       "sed -i 's|/src/src|src|g' test-report.xml",
//       `sonar-scanner -X -Dsonar.host.url=http://${project.secrets.team_name}-sonarqube-sonarqube:9000 -Dsonar.sources=src -Dsonar.login=${project.secrets.sonar_login} -Dsonar.password=${project.secrets.sonar_pass} -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info -Dsonar.testExecutionReportPaths=test-report.xml -Dsonar.tests=src -Dsonar.test.inclusions=src/**/*.spec.ts -Dsonar.typescript.lcov.reportPaths=coverage/lcov.info`,
//     ]

//     return staticAnalysis;
//   }
//   createPackageJob(e, project) {
//     var packageJob = new Job("package", "docker:dind")
//     packageJob.storage.enabled = true
//     packageJob.privileged = true; // dind needs to run in privileged mode

//     packageJob.env = {
//       "DOCKER_DRIVER": "overlay"
//     }

//     let taskFactory = new PackageTaskFactory(e, project)
//     packageJob.tasks = [
//       "mkdir /package && cd /package",
//       taskFactory.retrieveBuild(),
//       taskFactory.dockerStart(),
//       taskFactory.dockerPackage(),
//     ]

//     return packageJob;
//   }

//   createDeployJob(teamEnv, e, project) {
//     let deployTaskFactory = new DeployTaskFactory(teamEnv, e, project)
//     let deployJob = new Job(`${teamEnv}-deploy-enablers`, `globaldevopsreg11.azurecr.io/builder:latest`)
//     deployJob.storage.enabled = true

//     let values = {
//       port: 9000,
//       image: {
//         tag: "${APP_VER}",
//         repository: `${project.secrets.app_container_reg}/${project.secrets.app_name}`
//       },
//       cors_origin: "[]",
//       mongo_url: `mongodb://${project.secrets[teamEnv + "_mongo_user"]}:${project.secrets[teamEnv + "_mongo_pass"]}@${teamEnv}-mdb-mongodb:27017/${project.secrets[teamEnv + "_mongo_db"]}`
//     };

//     deployJob.tasks = [
//       deployTaskFactory.loginToCluster(),
//       deployTaskFactory.setAppVerEnv(),

//       "cd /src/",
//       // Create DB if not present
//       `export MONGO_POD=$(kubectl get pods -n ${teamEnv} | grep mongodb | awk '{print $1}')`,
//       `kubectl exec -t $MONGO_POD \
//         -n ${teamEnv} \
//         -- mongo ${project.secrets[teamEnv + "_mongo_db"]}  -u root -p ${project.secrets[teamEnv + "_mongo_root_pass"]} \
//         --authenticationDatabase admin \
//         --eval \"db.createUser({ user: '${project.secrets[teamEnv + "_mongo_user"]}', pwd: '${project.secrets[teamEnv + "_mongo_pass"]}', roles: [ { role: 'readWrite', db: '${project.secrets[teamEnv + "_mongo_db"]}' } ] })\"  && \
//       kubectl exec -it $MONGO_POD -n ${teamEnv} -- mongo ${project.secrets[teamEnv + "_mongo_db"]} -u ${project.secrets[teamEnv + "_mongo_user"]} -p ${project.secrets[teamEnv + "_mongo_pass"]} < /src/scripts/configInitConfigManager.scp  || \
//       echo DB already exists`,
//       deployTaskFactory.helmUpgradeInstallCommand(
//         `${teamEnv}`,
//         `${teamEnv}-${project.secrets.app_name}`,
//         `./helm/${project.secrets.app_name}`,
//         values)
//     ]
//     return deployJob;
//   }

//   createApprovalJob(e, project) {
//     let approval = new Job("approval", "docker:dind")
//     approval.storage.enabled = true
//     approval.privileged = true; // dind needs to run in privileged mode

//     approval.env = {
//       "DOCKER_DRIVER": "overlay"
//     }

//     let approvalTaskFactory = new ApprovalTaskFactory(e, project)
//     approval.tasks = [
//       approvalTaskFactory.basicApproval()
//     ]

//     return approval;
//   }
// }

// events.on("push", (e, project) => {
//   let jobFactory = new JobFactory()
//   var jsonPayload = JSON.parse(e.payload);
//   console.log(e)

//   // Run relevant stages
//   if (e.type == 'push') {
//     if (jsonPayload.ref == "refs/heads/develop") {
//       Group.runEach([
//         jobFactory.createBuildJob(e, project),
//         // jobFactory.createStaticAnalysisJob(e, project),
//         // jobFactory.createUnitTestJob(e, project),
//         jobFactory.createPackageJob(e, project),
//         jobFactory.createDeployJob(`${project.secrets.team_name}-dev`, e, project),
//         jobFactory.createApprovalJob(e, project),
//         jobFactory.createDeployJob(`${project.secrets.team_name}-test`, e, project),
//         jobFactory.createDeployJob(`${project.secrets.team_name}-int`, e, project),
//       ])
//     } else if (jsonPayload.ref == "refs/heads/master") {
//       console.log("Ignoring Master Push")
//     } else {
//       Group.runEach([jobFactory.createBuildJob(e, project)])
//     }
//   } else if (e.type == 'pull_request') {
//     console.log("Ignoring PULL REQUEST")
//   }
// })
// events.on("deploy", (e, project) => {
//   let jsonPayload = JSON.parse(e.payload);
//   new JobFactory().createDeployJob(jsonPayload.teamEnv, e, project).run()
// })

// exports.JobFactory = JobFactory
const { Job } = require("brigadier")
const devops = require("devops-brigade");

// TODO: The notifyInfoAsync method requires a Microsoft Teams webhook - see
// https://confluence-engineering.dentsuaegis.com/display/GD/Send+notifications+to+Teams+channel
// or comment them out until ready

class JobFactory {
  createBuildJob(e, project) {
    var build = new Job("build", "node")
    build.storage.enabled = true

    let taskFactory = new devops.BuildTaskFactory(e, project)
    build.tasks = [
      "cd /src",
      taskFactory.gitVersion(),
      taskFactory.npmVersion(),
      "npm install",
      taskFactory.storeBuild()
    ]

    return build;
  }
}

// TODO: notification via teams on error - remove if not using teams
// devops.Events.enableNotifyOnError();

devops.Events.onPushDevelop(async (e, project) => {
  let jobFactory = new JobFactory();

  await jobFactory.createBuildJob(e, project).run();
  await devops.Standard.approveAsync({ gitOnly: true });
  await devops.Standard.publishNpmPackageAsync({ allowRepoNameMismatch: true });
});

devops.Events.onPushOther(async (e, project) => {
  new JobFactory().createBuildJob(e, project).run();
});

exports.JobFactory = JobFactory
