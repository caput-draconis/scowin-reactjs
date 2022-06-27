node {
  env.NODEJS_HOME = "${tool 'Node 18.x'}"
    // on linux / mac
    env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"
    // on windows
    env.PATH="${env.NODEJS_HOME};${env.PATH}"
    sh 'npm --version'
  
  stage('Initialise') {
  }
  
  stage('SCM') {
    checkout scm
  }
//   stage('SonarQube Analysis') {
//     def scannerHome = tool 'sonarqube';
//     withSonarQubeEnv() {
//       sh "${scannerHome}/bin/sonar-scanner"
//     }
//   }
  stage('SonarQube analysis') {
//     def scannerHome = tool name: 'sonarqube', type: 'hudson.plugins.sonar.SonarRunnerInstallation';
    def scannerHome = tool name: 'sonarqube';
    withSonarQubeEnv('sonarqube') { 
      sh "${scannerHome}/bin/sonar-scanner"
    }
  }
  
   stage('Install dependencies') {
        sh 'node -v'
        sh 'npm -v'
     sh 'npm install'
        }

  stage('Build artifact') {
      sh 'npm run build'    
        }

}
