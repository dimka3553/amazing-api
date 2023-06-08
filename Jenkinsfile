pipeline {
    agent any
    tools {
        git 'Default'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Cloning repo'
                git branch: 'k8s', url: 'https://github.com/dimka3553/amazing-api.git'
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
                sh 'ssh-keyscan 192.168.105.4 > ~/.ssh/known_hosts'
                sh 'scp deployment.yaml vagrant@192.168.105.4:/home/vagrant'
                sh "ssh vagrant@192.168.105.4 'kubectl apply -f /home/vagrant/deployment.yaml'"
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
