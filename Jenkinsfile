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

        stage('Copy .env.local to root') {
            steps {
                sh 'cp frontend/.env.local .env.local'
            }
        }

        stage('Deploy frontend to Remote') {
            steps {
                sshagent(credentials: ['aicc']) {
                    sh """
                        echo "[1] 서버에 코드 복사 중..."
                        ssh -o StrictHostKeyChecking=no ${REMOTE_USER}@${REMOTE_HOST} '
                            rm -rf ${REMOTE_APP_DIR} &&
                            mkdir -p ${REMOTE_APP_DIR}
                        '

                        scp -r ./* ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_APP_DIR}/

                        echo "[2] 서버에서 Docker Compose로 프론트엔드만 빌드 및 실행"
                        ssh ${REMOTE_USER}@${REMOTE_HOST} '
                            cd ${REMOTE_APP_DIR} &&
                            docker-compose down &&
                            docker-compose up -d --build frontend
                        '
                    """
                }
            }
        }
    }

    post {
        success {
            echo '✅ 프론트엔드 배포 성공!'
        }
        failure {
            echo '❌ 프론트엔드 배포 실패! 상태를 확인해주세요.'
        }
    }
}
