# Используем OpenJDK 21
FROM openjdk:21-jdk

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем JAR-файл в контейнер
COPY target/*.jar app.jar

# Запускаем приложение
CMD ["java", "-jar", "app.jar"]
