// node {
//   env.NODEJS_HOME = "${tool 'NodeJS'}"
//     // on linux / mac
//     env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"
//     // on windows
//     env.PATH="${env.NODEJS_HOME};${env.PATH}"
//     sh 'node --version'
  
//   stage('Initialise') {
//   }
  
//   stage('SCM') {
//     checkout scm
//   }
// //   stage('SonarQube Analysis') {
// //     def scannerHome = tool 'sonarqube';
// //     withSonarQubeEnv() {
// //       sh "${scannerHome}/bin/sonar-scanner"
// //     }
// //   }
//   stage('SonarQube analysis') {
// //     def scannerHome = tool name: 'sonarqube', type: 'hudson.plugins.sonar.SonarRunnerInstallation';
//     def scannerHome = tool name: 'sonarqube';
//     withSonarQubeEnv('sonarqube') { 
//       sh "${scannerHome}/bin/sonar-scanner"
//     }
//   }
  
//    stage('Install dependencies') {
//         sh 'node -v'
//         sh 'npm -v'
//      sh 'npm install'
//         }

//   stage('Build artifact') {
//       sh 'npm run build'    
//         }

// }

// pipeline {
//   env.NODEJS_HOME = "${tool 'NodeJS'}"
//     // on linux / mac
//     env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"
//     // on windows
//     env.PATH="${env.NODEJS_HOME};${env.PATH}"
//     sh 'node --version'
  
//   stage('Initialise') {
//   }
  
//   stage('SCM') {
//     checkout scm
//   }
//     stages {
//         stage('Build') {
//             steps {
//                 sh 'npm install'
//             }
//         }
// //         stage('Test') {
// //             steps {
// //                 sh './jenkins/scripts/test.sh'
// //             }
// //         }
// //         stage('Deliver') {
// //             steps {
// //                 sh './jenkins/scripts/deliver.sh'
// //                 input message: 'Finished using the web site? (Click "Proceed" to continue)'
// //                 sh './jenkins/scripts/kill.sh'
// //             }
// //         }
//     }
// }


// pipeline {
//     agent any

//     stages {
//         stage('Build') {
//             steps {
//                 nodejs(nodeJSInstallationName: 'NodeJS', configId: '<config-file-provider-id>') {
//                     sh 'npm -v'
//                 }
//             }
//         }
//     }
// }

pipeline {
    agent any
  tools {nodejs "NodeJS"}

    stages {
//         stage('Initialise') {
//   }
  
  stage('SCM') {
    steps {
    checkout scm
    }
    
  }

  stage('SonarQube analysis') {
    steps {
//     def scannerHome = tool name: 'sonarqube', type: 'hudson.plugins.sonar.SonarRunnerInstallation';
//     def scannerHome = tool name: 'sonarqube';
    withSonarQubeEnv('sonarqube') { 
      sh "${scannerHome}/bin/sonar-scanner"
    }
         }
  }
        stage('Build') {
            steps {
                sh 'npm --version'
              sh 'npm run build'
            }
        }
//         stage('Test') {
//             steps {
//                 sh 'npm run unit-test'
//             }
//         }
//         stage('Deliver') {
//             steps {
// //                 sh './jenkins/scripts/deliver.sh'
// //                 input message: 'Finished using the web site? (Click "Proceed" to continue)'
// //                 sh './jenkins/scripts/kill.sh'
//             }
//         }
    }
}
