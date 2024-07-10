pipeline {
    agent any 

    stages {
        stage('Build') {
            steps {
                dir('Backend') {
                    bat 'npm install'
                }
                dir('frontend/my-react-app') {
                    bat 'npm install'
                }
                bat 'npm install'
            }
        }
        stage('Deploy') {
            steps {
                dir('Backend') {
                    bat 'npm start'
                }
                dir('frontend/my-react-app') {
                    bat 'npm start'
                }
                bat 'npm test'
                dir('Backend') {
                    bat 'taskkill /IM node.exe /F'
                }
                dir('frontend/my-react-app') {
                    bat 'taskkill /IM node.exe /F'
                }
            }
        }
        
    }
    post {
        always {
        //Add channel name
        slackSend channel: 'jenkins',
        message: "Find Status of Pipeline:- ${currentBuild.currentResult} ${env.JOB_NAME} ${env.BUILD_NUMBER} ${BUILD_URL}"
        }
    }
}