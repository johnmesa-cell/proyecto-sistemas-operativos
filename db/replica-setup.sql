-- Esperar a que la base maestra esté lista antes de configurar la réplica
-- Este archivo se ejecuta automáticamente dentro del contenedor db-slave

-- Cambia la información de conexión si tus contraseñas o nombres son distintos
CHANGE MASTER TO
  MASTER_HOST='db-master',
  MASTER_USER='replicator',
  MASTER_PASSWORD='replica_pass',
  MASTER_LOG_FILE='mysql-bin.000001',
  MASTER_LOG_POS=4;

-- Inicia el proceso de replicación
START SLAVE;

-- Muestra el estado de la réplica (opcional, útil para verificar)
SHOW SLAVE STATUS;
