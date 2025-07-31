pipeline {
    agent any
 
    parameters {
        string(name: 'DEPLOY_VERSION', defaultValue: 'v1.0.0', description: 'Version label')
        string(name: 'BRANCH_NAME', defaultValue: 'main', description: 'Git branch')
        choice(name: 'ENV', choices: ['dev', 'staging', 'prod'], description: 'Target environment')
    }
 
    environment {
        REMOTE_USER = "ubuntu"
        REMOTE_HOST = "172.31.46.144"        
        REMOTE_DIR = "/var/www/html2"
        BACKUP_DIR = "/home/ubuntu/backups"
    }
 
    stages {
        stage('Check Public IP') {
            steps {
                sh '''
                    echo "Getting Public IP..."
                    curl http://checkip.amazonaws.com
                '''
            }
        }
        
        stage('Checkout') {
            steps {
                git branch: "${params.BRANCH_NAME}", url: 'https://github.com/VishalShindeSankey/devopstest'
            }
        }
 
        stage('Backup Existing HTML') {
            steps {
                sshagent (credentials: ['ec2-ssh-key']) {
                    sh """
                    ssh -o StrictHostKeyChecking=no ${REMOTE_USER}@${REMOTE_HOST} "mkdir -p ${BACKUP_DIR}/${params.DEPLOY_VERSION}"
                    ssh -o StrictHostKeyChecking=no ${REMOTE_USER}@${REMOTE_HOST} "cp ${REMOTE_DIR}/index.html ${BACKUP_DIR}/${params.DEPLOY_VERSION}/index.html || true"
                    """
                }
            }
        }
 
        stage('Deploy HTML') {
            steps {
                sshagent (credentials: ['ec2-ssh-key']) {
                    sh """
                    set -e
                    scp -o StrictHostKeyChecking=no index.html ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_DIR}/index.html
                    ssh -o StrictHostKeyChecking=no ${REMOTE_USER}@${REMOTE_HOST} "echo 'Deployed to ${params.ENV}'"
                    """
                }
            }
        }
    }
 
    post {
        success {
            echo ' Deployment successful!'
        }
        failure {
            echo ' Deployment failed. Rolling back...'
            sshagent (credentials: ['ec2-ssh-key']) {
                sh """
                ssh -o StrictHostKeyChecking=no ${REMOTE_USER}@${REMOTE_HOST} "cp ${BACKUP_DIR}/${params.DEPLOY_VERSION}/index.html ${REMOTE_DIR}/index.html || true"
                ssh -o StrictHostKeyChecking=no ${REMOTE_USER}@${REMOTE_HOST} "echo 'Rollback executed'"
                """
            }
        }
    }
}