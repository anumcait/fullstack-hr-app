/*  Jenkinsfile – Fullstack‑HR CI/CD  ****************************************
 *  CI/CD pipeline to bring up stack, restore backups if needed,
 *  and create a fresh backup at the end.
 ****************************************************************************/

pipeline {
  agent any

  environment {
    COMPOSE_FILE    = 'docker-compose.yaml'
    COMPOSE_PROJECT = 'fullstack-hr-pipeline'
    COMPOSE         = "docker compose -p ${COMPOSE_PROJECT} -f ${COMPOSE_FILE}"

    STACK_SERVICES  = 'db backend frontend prometheus grafana node-exporter loki promtail swagger nginx'
    BACKUP_DIR      = 'pg_restore'
    BACKUP_FILE     = "${BACKUP_DIR}/hrdb.backup"
    CONTAINER       = 'hr_postgres'
    WORKSPACE       = "${env.WORKSPACE}"

    DB_NAME = 'hrdb'
    DB_USER = 'postgres'
    DB_PWD  = 'postgres'
  }

  options {
    timestamps()
    buildDiscarder(logRotator(numToKeepStr: '10'))
    retry(conditions: [nonresumable()], count: 2)
  }

   stages {
       
    //  stage('Run Backup First') {
    //   steps {
    //     echo '⏳ Triggering HR Backup Pipeline...'
    //     build job: 'fullstack_db_backup', wait: true, propagate: true
    //     echo '✅ Backup pipeline completed.'
    //   }
    // }
// stage('Check DB & Trigger Backup') {
//   steps {
//     script {
//       echo '🔍 Checking if hr_postgres container is running...'

//       def containerExists = sh(
//         script: "docker ps --format '{{.Names}}' | grep -w hr_postgres || true",
//         returnStdout: true
//       ).trim()

//       if (containerExists == 'hr_postgres') {
//         echo '✅ hr_postgres container is running. Checking DB readiness...'

//         def dbReady = sh(
//           script: "docker exec hr_postgres pg_isready -U ${DB_USER} -d ${DB_NAME}",
//           returnStatus: true
//         )

//         if (dbReady == 0) {
//           echo '✅ Database is ready. Triggering backup job...'
//           build job: 'fullstack_db_backup', wait: true, propagate: true
//           echo '📦 Backup job completed successfully.'
//         } else {
//           echo '⚠️ Database is not accepting connections. Skipping backup.'
//         }

//       } else {
//         echo "⚠️ Container 'hr_postgres' not found or not running. Skipping backup."
//       }
//     }
//   }
// }

    stage('Checkout Code') {
      steps {
        deleteDir()
        checkout([$class: 'GitSCM',
          branches: [[name: '*/main']],
          userRemoteConfigs: [[url: 'https://github.com/anumcait/fullstack-hr-app.git']]
        ])
        sh 'ls -l loki-config.yaml || (echo "❌ File missing!" && exit 1)'

        sh '''
          ls ${env.WORKSPACE}
          pwd
          ls ./prometheus
          ls -l loki-config.yaml
          ls -lh ./prometheus/prometheus.yml || echo "File missing or inaccessible"
          stat ./prometheus/prometheus.yml || echo "File stat not available"
        '''

        sh '''
        
          test -f "${BACKUP_FILE}" || {
            echo "❌ Backup file not found: ${BACKUP_FILE}" ; exit 1 ; }
        '''
      }
    }
//     stage('Ensure DB Container is Running') {
//   steps {
//     script {
//       def dbRunning = sh(script: "docker ps -q -f name=hr_postgres", returnStdout: true).trim()
//       if (!dbRunning) {
//         echo "🧱 DB container not found! Starting stack..."
//         sh "${COMPOSE} up -d db"
//         sleep 10 // wait for db to initialize
//       }
//     }
//   }
// }
//   stage('Creating Backup'){
//         steps{
//             echo '📥 Creating fresh backup'
//       sh '''
//         TIMESTAMP=$(date +%Y%m%d%H%M%S)
//         FRESH_BACKUP="${BACKUP_DIR}/hrdb_${TIMESTAMP}.backup"

//         echo "📊 Rows in onduty_permission table before backup:"
//         docker exec -e PGPASSWORD=${DB_PWD} ${CONTAINER} \
//           psql -U postgres -d hrdb -c "SELECT COUNT(*) FROM onduty_permission;" || echo "⚠️ Table may not exist yet"

//         docker exec -e PGPASSWORD=${DB_PWD} ${CONTAINER} \
//           pg_dump -U ${DB_USER} -F c -b -v -f /tmp/hrdb-latest.backup ${DB_NAME}

//         mkdir -p ${BACKUP_DIR}
//         docker cp ${CONTAINER}:/tmp/hrdb-latest.backup "${FRESH_BACKUP}"
//         cp "${FRESH_BACKUP}" "${BACKUP_FILE}"   # update default restore file

//         echo "✅ New backup saved: ${FRESH_BACKUP}"
//       '''
//     }
//         }
    
    stage('Down old stack') {
      steps {
        sh '''
          echo "🧹 Stopping & removing stack containers…"
          ${COMPOSE} stop ${STACK_SERVICES} || true
          ${COMPOSE} rm -f ${STACK_SERVICES} || true

        #  echo "🧼 Removing Postgres volume…"
        # docker volume rm fullstack-hr-pipeline_pgdata || true
        '''
      }
    }

  stage('Up stack') {
    steps {
       dir("${env.WORKSPACE}"){
        sh '''
          echo "🚀 Bringing up stack…"
          ${COMPOSE} up -d --build ${STACK_SERVICES}
        '''
       }
    }
  }
    stage('Wait for DB to be Ready') {
      steps {
        script {
          timeout(time: 90, unit: 'SECONDS') {
            waitUntil {
              sh(script: "docker inspect -f '{{.State.Health.Status}}' ${CONTAINER}",
                 returnStdout: true).trim() == 'healthy'
            }
          }
        }
      }
    }

  stage('Restore backup (only if needed)') {
  steps {
    script {
      // Check if DB has any tables
      def tableCount = sh(
        script: """
          docker exec ${CONTAINER} psql -U ${DB_USER} -d ${DB_NAME} -tAc \\
            "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema='public';"
        """,
        returnStdout: true
      ).trim()

      if (tableCount == '0') {
        echo "🛠️ No tables found in DB. Proceeding with restore…"

        // Terminate connections and drop/create DB
        sh """
          echo "🔒 Terminating active connections to ${DB_NAME}..."
          docker exec -e PGPASSWORD=${DB_PWD} ${CONTAINER} \\
            psql -U ${DB_USER} -d postgres -c \\
              "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname='${DB_NAME}' AND pid <> pg_backend_pid();"

          echo "🧨 Dropping database..."
          docker exec -e PGPASSWORD=${DB_PWD} ${CONTAINER} \\
            psql -U ${DB_USER} -d postgres -c "DROP DATABASE IF EXISTS ${DB_NAME};"

          echo "🆕 Creating fresh database..."
          docker exec -e PGPASSWORD=${DB_PWD} ${CONTAINER} \\
            psql -U ${DB_USER} -d postgres -c "CREATE DATABASE ${DB_NAME};"
        """

        // Restore from backup
        sh """
          echo "📦 Copying backup into container…"
          docker cp "${BACKUP_FILE}" ${CONTAINER}:/tmp/hrdb.backup

          echo "🔄 Restoring data…"
          docker exec -e PGPASSWORD=${DB_PWD} ${CONTAINER} \\
            pg_restore --no-owner --clean --if-exists \\
                      -U ${DB_USER} -d ${DB_NAME} /tmp/hrdb.backup

          echo "✅ Restore finished"
        """
      } else {
        echo "✅ Database already initialized. Skipping restore."
      }
    }
  }
}

//     stage('Restore backup (only if needed)') {
//   steps {
//     script {
//       // Step 1: Check if the DB exists and has tables
//       def tableCount = sh(
//         script: """
//           docker exec ${CONTAINER} psql -U ${DB_USER} -d ${DB_NAME} -tAc \
//             "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema='public';"
//         """,
//         returnStdout: true
//       ).trim()

//       if (tableCount == '0') {
//         echo "🛠️ No tables found in DB. Proceeding with restore…"

//         // Step 2: Terminate active connections and drop/recreate database
//         sh """
//           echo "🔒 Terminating connections…"
//           docker exec -e PGPASSWORD=${DB_PWD} ${CONTAINER} \
//             psql -U ${DB_USER} -d postgres -c \
//               "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname='${DB_NAME}' AND pid <> pg_backend_pid();"
        
//           echo "🧨 Dropping database…"
//           docker exec -e PGPASSWORD=${DB_PWD} ${CONTAINER} \
//             psql -U ${DB_USER} -d postgres -c "DROP DATABASE IF EXISTS ${DB_NAME};"
        
//           echo "🆕 Creating fresh database…"
//           docker exec -e PGPASSWORD=${DB_PWD} ${CONTAINER} \
//             psql -U ${DB_USER} -d postgres -c "CREATE DATABASE ${DB_NAME};"
//         """

//         // Step 3: Restore the backup
//         sh """
//           echo "📦 Copying backup into container…"
//           docker cp "${BACKUP_FILE}" ${CONTAINER}:/tmp/hrdb.backup

//           echo "🔄 Restoring data…"
//           docker exec -e PGPASSWORD=${DB_PWD} ${CONTAINER} \
//             pg_restore --no-owner --clean --if-exists \
//                       -U ${DB_USER} -d ${DB_NAME} /tmp/hrdb.backup

//           echo "✅ Restore finished"
//         """
//       } else {
//         echo "✅ Database already initialized. Skipping restore."
//       }
//     }
//   }
// }

// stage('PostgreSQL Backup') {
//   steps {
//     script {
//       sh '''
//         echo "📁 Ensuring local backup directory exists..."
//         mkdir -p ./pg_restore

//         echo "🔒 Setting permissions inside container..."
//         docker exec hr_postgres chown -R postgres:postgres pg_backup

//         echo "🧠 Running pg_dump inside container to /pg_backup/hrdb.backup..."
//         docker exec -u postgres hr_postgres bash -c 'pg_dump -Fc -d hrdb -f /pg_backup/hrdb.backup'

//         echo "✅ Checking if backup file exists on host..."
//         test -f ./pg_restore/hrdb.backup || { echo "❌ Backup file not found on host" ; exit 1 ; }
//       '''
//     }
//   }
// }

    stage('Smoke Test') {
      steps {
        sh '''
          echo "🔎 Verifying data in employee_master…"
          docker exec ${CONTAINER} \
            psql -U ${DB_USER} -d ${DB_NAME} \
            -c "SELECT COUNT(*) AS rows_in_employee_master FROM employee_master;"
        '''
      }
    }
 }
  
// stage('Smoke Test') {
//   steps {
//     script {
//       def rowCount = sh(script: "docker exec -e PGPASSWORD=postgres hr_postgres psql -U postgres -d hrdb -t -c \"SELECT COUNT(*) FROM employee_master;\" || echo 0", returnStdout: true).trim()
//       if (rowCount == "0") {
//         echo "⚠️ Empty database detected. Consider restoring backup."
//         // Optional: trigger restore here
//       } else {
//         echo "✅ Smoke test passed. Data exists."
//       }
//     }
//   }
// }
  post {
    success {
      echo '📥 Success'
      
    }

    failure {
      echo '💥 Build failed – dumping last 100 db log lines'
      sh '${COMPOSE} logs --tail=100 db || true'
    }
  }
}
