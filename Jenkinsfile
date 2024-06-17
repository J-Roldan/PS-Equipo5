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
                dir('Backend') {
                    bat 'npm test'
                }
                dir('frontend/my-react-app') {
                    bat 'npm test'
                }
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
                input message: 'Finished using the web site? (Click "Proceed" to continue)'
                dir('Backend') {
                    bat 'taskkill /IM node.exe /F'
                }
                dir('frontend/my-react-app') {
                    bat 'taskkill /IM node.exe /F'
                }
            }
        }
        // stage('Deliver') {
        //     steps {
        //         bat 'icacls .\\.jenkins\\scripts\\deliver.bat /grant Todos:F'
        //         bat 'icacls .\\.jenkins\\scripts\\deliverServer.bat /grant Todos:F'
        //         bat 'icacls .\\.jenkins\\scripts\\kill.bat /grant Todos:F'
        //         bat 'cd .\\Backend && ..\\.jenkins\\scripts\\deliverServer.bat'
        //         bat 'cd .\\frontend\\my-react-app && echo "Debug"'
        //         bat 'cd .\\frontend\\my-react-app && ..\\..\\.jenkins\\scripts\\deliver.bat'
        //         input message: 'Finished using the web site? (Click "Proceed" to continue)'
        //         bat 'cd .\\Backend && ..\\.jenkins\\scripts\\kill.bat'
        //         bat 'cd .\\frontend\\my-react-app && ..\\..\\.jenkins\\scripts\\kill.bat'
        //     }
        // }
    }
}