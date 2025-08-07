pipeline {
    agent any

    environment {
        REMOTE_USER = 'aicc'                        // SSH 접속할 사용자명 (관리자 제공값)
        REMOTE_HOST = '192.168.0.80'                // 공유 서버 내부 IP
        REMOTE_APP_DIR = '/home/aicc/schedule-planner-cicd-test'  // 원격 서버의 소스 경로
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

        stage('Deploy to Remote with Docker Compose') {
            steps {
                sshagent(credentials: ['aicc']) {
                    sh """
                        echo "[1] 서버에 코드 복사 중..."
                        ssh -o StrictHostKeyChecking=no ${REMOTE_USER}@${REMOTE_HOST} '
                            rm -rf ${REMOTE_APP_DIR} &&
                            mkdir -p ${REMOTE_APP_DIR}
                        '

                        scp -r ./* ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_APP_DIR}/

                        echo "[2] 서버에서 Docker Compose 빌드 및 실행"
                        ssh ${REMOTE_USER}@${REMOTE_HOST} '
                            cd ${REMOTE_APP_DIR} &&
                            docker-compose down &&
                            docker-compose up -d --build
                        '
                    """
                }
            }
        }
    }

    post {
        success {
            echo '✅ 배포 성공!'
        }
        failure {
            echo '❌ 배포 실패! 상태를 확인해주세요.'
        }
    }
}
