pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[
                        url: 'https://github.com/USER/saegim-ai-diary.git',
                        credentialsId: 'github-https-token'
                    ]]
                ])
            }
        }

        stage('Frontend Build') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Docker Deploy') {
            steps {
                sh 'docker compose down || true'
                sh 'docker compose build'
                sh 'docker compose up -d'
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}