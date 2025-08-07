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
                echo "[1] 원격 서버 디렉토리 생성 또는 유지"
                ssh -i ${SSH_KEY} ${REMOTE_USER}@${REMOTE_HOST} "mkdir -p ${REMOTE_DIR}"

                echo "[2] 코드 파일 원격 서버로 전송"
                scp -i ${SSH_KEY} -r * ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_DIR}

                echo "[3] Docker Compose 빌드 및 실행"
                ssh -i ${SSH_KEY} ${REMOTE_USER}@${REMOTE_HOST} "
                    cd ${REMOTE_DIR} &&
                    docker-compose build &&
                    docker-compose up -d
                "
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
