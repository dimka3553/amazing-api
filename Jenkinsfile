pipeline {
    agent any
    tools {
        git 'Default'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Cloning repo'
                git branch: 'main', url: 'https://github.com/dimka3553/amazing-api.git'
            }
        }
        stage('Build Docker') {
            steps {
                script {
                    sh 'sudo docker build -t ttl.sh/amazing-api:1h . '
                    sh 'sudo docker push ttl.sh/amazing-api:1h'
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying...'
                sh "ssh -i ~/.ssh/id_rsa vagrant@192.168.105.3 'sudo docker stop running-api || true'"
                sh "ssh -i ~/.ssh/id_rsa vagrant@192.168.105.3 'sudo docker rm running-api || true'"
                sh "ssh -i ~/.ssh/id_rsa vagrant@192.168.105.3 'sudo docker run --pull always -d --restart=unless-stopped --name running-api -p 8080:8080 ttl.sh/amazing-api:1h'"
            }
        }
    }

    post {
        failure {
            echo 'There were some failures...'
        }
        success {
            echo 'All stages completed successfully!'
        }
    }
}
