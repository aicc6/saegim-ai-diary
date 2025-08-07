pipeline {
    agent any

    environment {
        REMOTE_HOST = 'aicc@192.168.0.80'
        REMOTE_DIR = '/home/aicc/schedule-planner-cicd-test'
        ENV_CONTENT = credentials('frontend_env')  // ✅ 수정된 크리덴셜 ID
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
                sshagent (credentials: ['aicc']) {
                    sh '''
                        echo [1] 서버에 코드 복사 중...
                        ssh -o StrictHostKeyChecking=no $REMOTE_HOST \
                            "rm -rf $REMOTE_DIR && mkdir -p $REMOTE_DIR"

                        scp -r ./.env.local ./DOCKER_README.md ./backend ./docker-compose.dev.yml ./docker-compose.yml ./docs ./env.example ./frontend $REMOTE_HOST:$REMOTE_DIR/

                        echo [2] 서버에서 Docker Compose로 프론트엔드만 빌드 및 실행
                        ssh $REMOTE_HOST "
                            cd $REMOTE_DIR &&
                            docker-compose down &&
                            docker-compose up -d --build frontend
                        "
                    '''
                }
            }
        }
    }

    post {
        failure {
            echo '❌ 프론트엔드 배포 실패! 상태를 확인해주세요.'
        }
        success {
            echo '✅ 프론트엔드 배포 성공!'
        }
    }
}
