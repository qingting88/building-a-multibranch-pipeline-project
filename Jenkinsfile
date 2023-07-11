pipeline {
    agent {
        docker {
            image 'node:latest'
            args '-p 3000:3000 -u root' 
        }
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
         stage('Test'){
            steps {
                echo "Hi,I am Test"
            }
        }
    }
}