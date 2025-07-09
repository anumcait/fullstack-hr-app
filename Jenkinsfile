pipeline {
  agent any  // Run this on any available Jenkins agent

  environment {
    BACKEND_IMAGE = 'hr-backend'
    FRONTEND_IMAGE = 'hr-frontend'
  }

  stages {
    stage('Checkout Code') {
      steps {
        echo '🔄 Cloning source code...'
        // You can remove this if Jenkins is already set to use your repo
        checkout scm
      }
    }

    stage('Install Dependencies') {
      steps {
        echo '📦 Installing backend dependencies...'
        dir('backend') {
          sh 'npm install'
        }

        echo '📦 Installing frontend dependencies...'
        dir('frontend') {
          sh 'npm install'
        }
      }
    }

    stage('Build Docker Images') {
      steps {
        echo '🐳 Building Docker images for backend and frontend...'
        sh 'docker build -t $BACKEND_IMAGE ./backend'
        sh 'docker build -t $FRONTEND_IMAGE ./frontend'
      }
    }

    stage('Scan Backend Image with Trivy') {
      steps {
        echo '🔍 Scanning backend image for vulnerabilities...'
        sh '''
          if ! command -v trivy >/dev/null; then
            echo "⚠️ Trivy is not installed. Please install it on the Jenkins agent."
            exit 1
          fi
          trivy image --exit-code 1 --severity HIGH,CRITICAL $BACKEND_IMAGE
        '''
      }
    }

    stage('Scan Frontend Image with Trivy') {
      steps {
        echo '🔍 Scanning frontend image for vulnerabilities...'
        sh 'trivy image --exit-code 1 --severity HIGH,CRITICAL $FRONTEND_IMAGE'
      }
    }

    stage('Deploy using Docker Compose') {
      steps {
        echo '🚀 Deploying full stack app with docker-compose...'
        sh 'docker compose up -d --build'
      }
    }
  }

  post {
    success {
      echo '✅ Pipeline completed successfully.'
    }
    failure {
      echo '❌ Something went wrong. Check logs for errors.'
    }
  }
}
