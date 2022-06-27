node {
  tools {nodejs "nodejs"}
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
        sh 'npm install'
        }

  stage('Build artifact') {
      sh 'npm run build'    
        }

}
