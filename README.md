# Proyecto Sprints AUJ

## Descripción

Este proyecto es una API RESTful diseñada para gestionar sprints en un entorno de trabajo colaborativo.
La API permite leer, crear, actualizar y eliminar usuarios, sprints y tareas, utilizando una bases de datos local (Archivo JSON)
Los archivos .JSON guardan la información sobre los usuarios, los sprints y las tareas, relacionadas entre si a través de ids.
El proyecto fue desarrollado con las tecnologías Node.js y Express.

## Instalación
Guía paso a paso sobre cómo configurar el proyecto en un entorno local.

- Clonar el repositorio:
  `git clone https://github.com/Nachit0C/ProyectoSprintsAUJ.git`
- Instalar dependencias: en la carpeta donde está el proyecto clonado
  `npm install`
- Ejecutar el proyecto:
  `npm start`
  
## Uso

### Endpoints users:
- **GET: /users/all**: Devuelve todos los usuarios.
- **GET: /users/:id**: Devuelve todos datos de un usuario.
- **PUT: /users/update/:id**: Actualiza los datos de un usuario.
- **POST: /users/create**: Crea un nuevo usuario.
- **DELETE: /users/delete/:id**: Elimina un usuario por ID, reasignando tareas si es necesario.

### Endpoints sprints:
- **GET: /sprints/all**: Devuelve todos los sprints.
- **GET: /sprints/:id**: Devuelve todos datos de un sprint.
- **PUT: /sprints/update/:id**: Actualiza los datos de un sprint.
- **POST: /sprints/create**: Crea un nuevo sprint.
- **DELETE: /sprints/delete/:id**: Elimina un sprint.

### Endpoints tareas:
- **GET: /tareas/all**: Devuelve todas las tareas.
- **GET: /tareas/:id**: Devuelve todos datos de una tarea.
- **PUT: /tareas/update/:id**: Actualiza los datos de una tarea.
- **POST: /tareas/create**: Crea una nueva tarea.
- **DELETE: /tareas/delete/:id**: Elimina una tarea.

## Colaboraciones Recibidas

Se recibió colaboración de: [@alexcepedaf](https://github.com/alexcepedaf) quien implementó las siguientes funciones:

-  usuarioResponsableDeTarea(userId):
  
    Verifica si el userId es responsable de alguna tarea
- asignarResponsableATarea(responsable, tareaId):
  
    Asigna responsable a la tarea
  
 Para luego utilizar ambas funciones en deleteUser con el fin de, antes de eliminar un usuario, reasignar el responsable a las tareas cuyo responsable era el usuario a eliminar.

## Próximos Pasos

- Implementación de autenticación y autorización.
- Integración con una bases de datos relacional.
- Desarrollar una interfaz de usuario para la gestión de tareas.

## Contacto
Para cualquier consulta, puedes contactarme a través de mi correo electrónico: nachociccone@gmail.com

## Por qué debería ser seleccionado para los grupos de trabajo de Backend

**Habilidades Técnicas:** He adquirido sólidos conocimiento en desarrollo backend utilizando JavaScript, Node.js y Express, entre otros, gracias a los diversos cursos y proyectos realizados.
Gracias a ellos, puedo implementar funciones y código que manejen APIs utilizando bases de datos relacionales, autenticación y autorización y escalabilidad.
Esto se puede observar, por ejemplo, en el Proyecto FullStack-Universidad que se encuentra en mi perfil en donde utilizo todas las tecnologías mencionadas.
Estos conocimientos se complementan muy bien con el resto de mis habilidades técnicas:
- Desarrollo frontend con HTML, CSS, JavaScript
- Conocimientos en algoritmos y estructura de datos con C, C++
- Aptitud en otros lenguajes como Python y SQL (para manejo de bases de datos).

Estoy en proceso de seguir mejorando mi stack tecnológico, incluyendo nuevas tecnologías como Django, Flask o Spring. Manejo de distintas bases de datos como PosgrateSQL, MongoDB.
También entorno de desarrollo frontend como React o Angular.

**Experiencia y Proyectos:** Si bien "Sprints AUJ" es un proyecto sencillo, creo que demuestra mi capacidad para llevar adelante proyectos básicos.
Sumado a eso, poseo la experiencia en encarar desafíos en un contexto de grupo, lo cual considero importante para conseguir el éxito en cualquier proyecto.
Todo esto me da confianza para aplicar a proyectos en donde aporte desde mi posición y donde también donde pueda aprender mucho mas.

**Motivación y compromiso:** Me encuentro altamente motivado para el siguiente paso en mi carrera como programador, el cual consiste en obtener experiencia real de trabajo en un proyecto.
El mismo puede venir en distintas formas, y la propuesta de Adopta Un Junior es exactamente lo que estoy buscando, por lo que sería una gran oportunidad ser seleccionado.
Si eso ocurre, estoy dispuesto a aprender nuevas tecnologías o metodologías según lo requiera el proyecto, entregar resultados de alta calidad y a cumplir con los plazos establecidos.
