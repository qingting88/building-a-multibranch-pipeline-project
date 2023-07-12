pipeline {
  agent {
    docker {
      image 'node:latest'
      args '-p 3000:3000 -u root'
    }

  }
  stages {
    stage('Build') {
      steps {
        sh 'npm install'
      }
    }

    stage('Test') {
      steps {
        echo 'Hi,I am Test'
      }
    }

    stage('Deliver for development') {
      when {
        branch 'development'
      }
      steps {
        echo 'Hi,Deliver for development'
      }
    }

    stage('Deploy for production') {
      when {
        branch 'production'
      }
      steps {
        echo 'Hi,Deliver for production'
      }
    }

  }
  environment {
    CI = 'true'
  }
}