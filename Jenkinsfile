pipeline {
  agent any
  tools {
    nodejs "NodeJS"
  }

  stages {

    stage('Build artifactory') {
      steps {
        sh 'npm install'
        sh 'mkdir -p test-reports'
        sh 'npm run build'
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
        stage('Upload artifact to S3') {
      steps {
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
            withAWS(region: 'us-east-1', credentials: 'my-aws', force: true) {
        s3Download(file: 'scowin-reactjs.tar.gz', bucket: 'scowin', path: '/tmp/')
      }
        sh 'tar -xvzf /tmp/scowin-reactjs.tar.gz -C /tmp/'
       sh 'scp -r /tmp/build/* /Users/ashank661/Desktop/apache-tomcat-10.0.22-production/webapps/scowin-reactjs/'
      }
    }

  }
}
