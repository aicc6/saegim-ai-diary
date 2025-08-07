pipeline {
    agent any

    environment {
        REMOTE_USER = 'aicc'
        REMOTE_HOST = '192.168.0.80'
        REMOTE_DIR = '/home/aicc/saegim-ai-diary'
        SSH_KEY = '~/.ssh/id_rsa'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[
                        url: 'https://github.com/aicc6/saegim-ai-diary.git',
                        credentialsId: 'github-https-token'
                    ]]
                ])
            }
        }

        stage('Deploy to Remote with Docker Compose') {
            steps {
                sh '''
                set -e  # 실패 시 즉시 중단

                echo "[1] ✅ 원격 서버 디렉토리 생성 또는 유지"
                ssh -i ${SSH_KEY} ${REMOTE_USER}@${REMOTE_HOST} "mkdir -p ${REMOTE_DIR}"

                echo "[2] ✅ 코드 파일을 원격 서버로 전송 (숨김파일 포함)"
                scp -i ${SSH_KEY} -r . ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_DIR}

                echo "[3] ✅ 원격 서버에서 Docker Compose 빌드 및 실행 시작"
                ssh -i ${SSH_KEY} ${REMOTE_USER}@${REMOTE_HOST} bash -c "'
                    set -e
                    cd ${REMOTE_DIR}
                    echo \"[REMOTE] 📦 docker-compose build 시작\"
                    docker-compose build
                    echo \"[REMOTE] 🚀 docker-compose up -d 시작\"
                    docker-compose up -d
                    echo \"[REMOTE] ✅ 컨테이너 정상 실행 완료\"
                '"
                '''
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
