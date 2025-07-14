pipeline {
  agent any

  environment {
    /* Compose project */
    PROJECT   = 'fullstack-hr-pipeline'
    COMPOSE   = "docker compose -p ${PROJECT} -f docker-compose.yaml"
    APP_SVCS  = 'db backend frontend'

    /* Restore artefacts */
    BACKUP    = 'pg_restore/hrdb.backup'
    RESTORE_SH= 'init-scripts/01-restore-db.sh'

    GIT_LFS_SKIP_SMUDGE = '1'   // clone fast, pull LFS later
  }

  stages {

    /* ─────────── Clone repo & pull backup ─────────── */
    stage('Checkout') {
      steps {
        deleteDir()
        git url: 'https://github.com/anumcait/fullstack-hr-app.git', branch: 'main'
        sh 'git lfs pull --include="${BACKUP}"'
        sh 'ls -lh ${BACKUP}'
      }
    }

    /* ─────────── Quick sanity check ─────────── */
    stage('Validate assets') {
      steps {
        sh '''
          [ -x ${RESTORE_SH} ] || { echo "❌ restore script not executable"; exit 1; }
          [ -s ${BACKUP} ]     || { echo "❌ backup file missing/empty"; exit 1; }
          echo "✅ assets OK"
        '''
      }
    }

    /* ─────────── Reset pgdata volume ─────────── */
    stage('Reset pgdata') {
      steps {
        sh 'docker volume ls -qf name=${PROJECT}_pgdata | xargs -r docker volume rm'
      }
    }

    /* ─────────── Build & run stack ─────────── */
    stage('Up stack') {
      steps {
        sh '''
          ${COMPOSE} down --remove-orphans ${APP_SVCS} || true
          ${COMPOSE} up -d --build ${APP_SVCS}
        '''
      }
    }

    /* ─────────── Wait for /tmp/RESTORE_OK ─────────── */
    stage('Wait for restore') {
      steps {
        timeout(time: 10, unit: 'MINUTES') {
          waitUntil {
            script {
              sh(script: "${COMPOSE} exec -T db test -f /tmp/RESTORE_OK",
                 returnStatus: true) == 0
            }
          }
          echo '🚩 Restore flag detected'
        }
      }
    }

    /* ─────────── DB smoke test ─────────── */
    stage('DB smoke test') {
      steps {
        sh '''
          count=$(${COMPOSE} exec -T db psql -At -U postgres -d hrdb \
                   -c "SELECT COUNT(*) FROM pg_tables WHERE schemaname='public';")
          echo "📊 table count: $count"
          [ "$count" -gt 0 ] || { echo "❌ restore produced zero tables"; exit 1; }
          echo "✅ DB restore verified"
        '''
      }
    }
  }

  post {
    success {
      echo '🎉 Stack is running!'
      echo '🌐 http://localhost:5173'
      echo '🔌 http://localhost:5000'
    }
    failure {
      echo '💥 build failed – tearing down stack'
      sh '${COMPOSE} down -v --remove-orphans ${APP_SVCS} || true'
    }
    aborted {
      sh '${COMPOSE} down -v --remove-orphans ${APP_SVCS} || true'
    }
  }
}



// pipeline {
//   agent any

//   environment {
//     BACKEND_IMAGE = 'hr-backend'
//     FRONTEND_IMAGE = 'hr-frontend'
//   }

//   stages {
//     stage('Checkout Code') {
//       steps {
//         deleteDir()
//         git url: 'https://github.com/anumcait/fullstack-hr-app.git', branch: 'main'
//       }
//     }

//     stage('Build Docker Images') {
//       steps {
//         sh 'docker build -t $BACKEND_IMAGE ./backend'
//         sh 'docker build -t $FRONTEND_IMAGE ./frontend'
//       }
//     }

//     stage('Deploy') {
//       steps {
//         dir('/app') {
//           sh 'docker-compose up -d frontend backend'
//         }
//       }
//     }
//   post {
//     success {
//       echo '✅ App deployed at http://localhost:5173'
//     }
//     failure {
//       echo '❌ Deployment failed'
//     }
//   }
// }


// // pipeline {
// //   agent any 

// //   environment {
// //     BACKEND_IMAGE = 'hr-backend'
// //     FRONTEND_IMAGE = 'hr-frontend'
// //   }

// //   stages {
// //     stage('Checkout Code') {
// //       steps {
// //         echo '🔄 Cloning source code...'
// //         deleteDir() 
// //         git url: 'https://github.com/anumcait/fullstack-hr-app.git', branch: 'main'
// //       }
// //     }
// //     stage('Install Dependencies') {
// //       steps {
// //         echo '📦 Installing backend dependencies...'
// //         dir('backend') {
// //           sh 'npm install'
// //         }

// //         echo '📦 Installing frontend dependencies...'
// //         dir('frontend') {
// //           sh 'npm install'
// //         }
// //       }
// //     }

// //     stage('Build Docker Images') {
// //       steps {
// //         echo '🐳 Building Docker images for backend and frontend...'
// //         sh 'docker build -t $BACKEND_IMAGE ./backend'
// //         sh 'docker build -t $FRONTEND_IMAGE ./frontend'
// //       }
// //     }

// //     stage('Scan Backend Image with Trivy') {
// //       steps {
// //         echo '🔍 Scanning backend image for vulnerabilities...'
// //         sh '''
// //           if ! command -v trivy >/dev/null; then
// //             echo "⚠️ Trivy is not installed. Please install it on the Jenkins agent."
// //             exit 1
// //           fi
// //           trivy image --exit-code 0 --severity HIGH,CRITICAL $BACKEND_IMAGE
// //         '''
// //       }
// //     }

// //     stage('Scan Frontend Image with Trivy') {
// //       steps {
// //         echo '🔍 Scanning frontend image for vulnerabilities...'
// //         sh 'trivy image --exit-code 0 --severity HIGH,CRITICAL $FRONTEND_IMAGE'
// //       }
// //     }

// //     stage('Deploy using Docker Compose') {
// //       steps {
// //         echo '🚀 Deploying full stack app with docker-compose...'
// //         dir("$WORKSPACE") {
// //           sh 'docker-compose up -d --build --force-recreate --remove-orphans'
// //         }
// //       }
// //     }
// //   post {
// //     success {
// //       echo '✅ Pipeline completed successfully.'
// //     }
// //     failure {
// //       echo '❌ Something went wrong. Check logs for errors.'
// //     }
// //   }
// // }
