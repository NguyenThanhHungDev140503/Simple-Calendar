pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/NguyenThanhHungDev140503/Simple-Calendar.git' // Thay đổi URL repository của bạn
            }
        }

        stage('Build') {
            steps {
                dir('angular-calendar') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Test') {
            steps {
                dir('angular-calendar') {
                    sh 'npm test -- --watch=false --browsers=ChromeHeadless'
                }
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker compose -f docker-compose.prod.yml down'
                sh 'docker compose -f docker-compose.prod.yml up -d --build'
            }
        }
    }
}

