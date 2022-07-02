pipeline {
  agent any
  tools {
    nodejs "NodeJS"
  }

  stages {

    stage('Build staging artifactory') {
      steps {
        sh 'mkdir -p test-reports'
        sh 'npm run build:staging'
      }
    }
    stage('SonarQube analysis') {
      steps {
        withSonarQubeEnv('sonarqube') {
          sh '/Users/ashank661/.jenkins/tools/hudson.plugins.sonar.SonarRunnerInstallation/sonarqube/bin/sonar-scanner'
        }
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
        sh 'rm -rf /Users/ashank661/Desktop/apache-tomcat-10.0.22-staging/webapps/scowin-reactjs/*'
        sh 'scp -r build/* /Users/ashank661/Desktop/apache-tomcat-10.0.22-staging/webapps/scowin-reactjs/'
      }
    }

    stage('Build production artifactory') {
      steps {
        sh 'rm -rf build'
        sh 'mkdir -p test-reports'
        sh 'npm run build:production'
      }
    }
        stage('Upload artifact to S3') {
      steps {
        sh 'rm -rf scowin-reactjs.tar.gz'
        sh 'tar -cvzf scowin-reactjs.tar.gz build'
        withAWS(region: 'us-east-1', credentials: 'my-aws') {
          sh 'echo "Uploading content with AWS creds"'
          s3Upload(pathStyleAccessEnabled: true, payloadSigningEnabled: true, file: 'scowin-reactjs.tar.gz', bucket: 'scowin')
        }
      }
    }

    stage('Deploy to production') {
      steps {
        sh 'export SCOWINENV=prod'
        input message: 'Push to prod? (Click "Proceed" to continue)'
        sh 'rm -rf /Users/ashank661/Desktop/apache-tomcat-10.0.22-production/webapps/scowin-reactjs/*'
            withAWS(region: 'us-east-1', credentials: 'my-aws') {
        s3Download(file: 'scowin-reactjs.tar.gz', bucket: 'scowin', force: true)
      }
        sh 'tar -xvzf /Users/ashank661/.jenkins/workspace/scowin-reactjs/scowin-reactjs.tar.gz/scowin-reactjs.tar.gz -C /tmp/'
       sh 'scp -r /tmp/build/* /Users/ashank661/Desktop/apache-tomcat-10.0.22-production/webapps/scowin-reactjs/'
      }
    }

  }
}
