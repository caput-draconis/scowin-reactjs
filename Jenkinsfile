pipeline {
  agent any
  tools {
    nodejs "NodeJS"
  }

  stages {
    stage('SCM') {
      steps {
        checkout scm
      }

    }

    stage('SonarQube analysis') {
      steps {
        withSonarQubeEnv('sonarqube') {
          sh 'pwd'
          sh '/Users/ashank661/.jenkins/tools/hudson.plugins.sonar.SonarRunnerInstallation/sonarqube/bin/sonar-scanner'
        }
      }
    }
    stage('Build artifactory') {
      steps {
        sh 'export CI=false'
        sh 'npm install'
        sh 'mkdir -p test-reports'
        sh 'npm run build'
      }
    }
    stage('Unit test') {
      steps {
        sh 'npm run unit-test'
      }
    }
    stage('Integration test') {
      steps {
        sh 'npm run integration-test'
        sh 'npm run generate-report'
      }
    }
    stage('Deploy to staging') {
      steps {
        sh 'export SCOWINENV=stag'
        sh 'rm -rf /Users/ashank661/Desktop/apache-tomcat-10.0.22-staging/webapps/scowin-reactjs/*'
        sh 'scp -r build/* /Users/ashank661/Desktop/apache-tomcat-10.0.22-staging/webapps/scowin-reactjs/'
      }
    }
    stage('Deploy to production') {
      steps {
        sh 'export SCOWINENV=prod'
        input message: 'Push to prod? (Click "Proceed" to continue)'
        sh 'rm -rf /Users/ashank661/Desktop/apache-tomcat-10.0.22-staging/webapps/scowin-reactjs/*'
        sh 'scp -r build/* /Users/ashank661/Desktop/apache-tomcat-10.0.22-staging/webapps/scowin-reactjs/'
      }
    }
    //         stage('Deliver') {
    //             steps {
    // //                 sh './jenkins/scripts/deliver.sh'
    // //                 input message: 'Finished using the web site? (Click "Proceed" to continue)'
    // //                 sh './jenkins/scripts/kill.sh'
    //             }
    //         }
  }
}
