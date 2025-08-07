pipeline {
    agent any

    environment {
        REMOTE_USER = 'aicc'
        REMOTE_HOST = '192.168.0.80'
        REMOTE_APP_DIR = '/home/aicc/schedule-planner-cicd-test'
        ENV_CONTENT = credentials('frontend_env')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[
                        url: 'https://github.com/seominji58/schedule-planner-cicd-test.git',
                        credentialsId: 'github-https-token'
                    ]]
                ])
            }
        }

        stage('Create frontend/.env.local') {
            steps {
                dir('frontend') {
                    writeFile file: '.env.local', text: "${ENV_CONTENT}"
                }
            }
        }

        // 🔥 이 줄 추가!
        stage('Copy .env.local to root') {
            steps {
                sh 'cp frontend/.env.local .env.local'
            }
        }

        stage('Deploy frontend to Remote') {
            steps {
                sshagent(credentials: ['aicc']) {
                    sh """
                        echo "[1] 서버에 코드 복사 중
