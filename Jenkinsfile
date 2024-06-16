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
            }
        }
        stage('Test'){
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
        stage('Deliver') {
            steps {
                bat 'icacls .\\jenkins\\scripts\\deliver.sh /grant Todos:F'
                bat 'icacls .\\jenkins\\scripts\\kill.sh /grant Todos:F'
                bat '.\\jenkins\\scripts\\deliver.sh'
                input message: 'Finished using the web site? (Click "Proceed" to continue)'
                bat '.\\jenkins\\scripts\\kill.sh'
            }
        }
    }
}