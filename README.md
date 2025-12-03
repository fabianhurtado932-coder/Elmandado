[Readme.md](https://github.com/user-attachments/files/23221157/Readme.md)
# Proyecto Formativo – Ingeniería de Software I

## Información General
**Nombre del Proyecto:**  
El mandado

**Equipo de Desarrollo:**  
Marco Antonio Segura Cuero

Fabian Andres Hurtado Viafara

Keiner David Acosta Hoyos

Carlos Eduardo Ñañez Gonzales

**Programa:** Ingeniería de Software I  
**Institución:** UNAD – Instituto Técnico Profesional  
**Grupo:** S441B-2  
**Versión del Documento:** v2 (Sesión 11)  
**Fecha de actualización:**  31/10/2025

---

## 1. Descripción General del Proyecto

El proyecto **El Mandado** busca desarrollar una aplicación móvil y web que facilite la **gestión de pedidos y entregas de comida o productos locales**, conectando usuarios, domiciliarios y comercios de la zona.  
Su objetivo principal es **optimizar los procesos de compra y entrega**, ofreciendo una experiencia ágil, segura y práctica tanto para clientes como repartidores.

## 2. Contexto y Justificación

El proyecto **El Mandado** surge ante la necesidad de **mejorar los servicios de entrega a domicilio** en sectores donde no hay plataformas digitales accesibles o adaptadas al comercio local.  
A nivel social, impulsa el **crecimiento del comercio de barrio**; y desde el punto de vista técnico, se eligió una **arquitectura por capas**, lo que permite una mejor organización del código, mantenimiento, escalabilidad y seguridad de la información.

## 3. Requisitos del Sistema

### 3.1 Requisitos Funcionales
| Código | Descripción | Estado |

| RF-01 | El sistema debe permitir registrar usuarios (clientes, repartidores y administradores). | Implementado |

| RF-02 | El sistema debe permitir realizar y gestionar pedidos. | En desarrollo |

| RF-03 | El sistema debe procesar pagos y aplicar promociones. | En desarrollo |

| RF-04 | El sistema debe enviar notificaciones sobre el estado del pedido. | Pendiente |



### 3.2 Requisitos No Funcionales
| Código | Descripción | Tipo |

| RNF-01 | La interfaz debe ser responsiva para móvil y escritorio. | Usabilidad |

| RNF-02 | La base de datos debe soportar al menos 1000 usuarios y pedidos activos. | Rendimiento |

| RNF-03 | Los datos deben almacenarse de forma cifrada y segura. | Seguridad |


## 4. Modelos del Sistema

### 4.1 Diagrama de Casos de Uso
<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/f8dd9426-5fe3-4de6-8dc3-3fac9ca23247" />


### 4.2 Diagrama de Clases
![Diagrama de Clases]
(.<img width="797" height="1234" alt="image" src="https://github.com/user-attachments/assets/88b67122-c5b3-4718-b2e5-c1c6fed1103d" />)

### 4.3 Arquitectura del Software
**Tipo de arquitectura:** Por capas (Presentación, Lógica de Negocio, Datos)

**Descripción:**  
Según el documento de arquitectura del sistema, se optó por un **modelo por capas** que separa las responsabilidades en tres niveles:  
- **Capa de presentación:** interfaz móvil/web que interactúa con los usuarios y domiciliarios.  
- **Capa lógica:** incluye los módulos *GestorUsuarios*, *GestorPedidos*, *GestorPagos* y *GestorNotificaciones*.  
- **Capa de datos:** maneja la *BaseDeDatos* encargada del almacenamiento y consultas de usuarios, pedidos y pagos.

---

## 5. Componentes Principales
| Componente | Función | Interacción | Estado |
|-------------|----------|-------------|--------|
| GestorUsuarios | Registrar, autenticar y administrar usuarios | Base de datos, GestorPedidos | Implementado |
| GestorPedidos | Crear, actualizar y consultar pedidos | GestorUsuarios, GestorPagos, GestorNotificaciones | En revisión |
| GestorPagos | Procesar pagos y aplicar promociones | GestorPedidos | En revisión |
| GestorNotificaciones | Enviar alertas sobre el estado del pedido | GestorPedidos, GestorUsuarios | Pendiente |
| BaseDeDatos | Almacenar información de usuarios, pedidos y pagos | Todos los gestores | Implementado |

---

## 6. Tecnologías y Herramientas
| Herramienta | Uso dentro del proyecto |
|--------------|------------------------|
| **Git / GitHub** | Control de versiones y trabajo colaborativo |
| **StarUML / Draw.io** | Creación de diagramas UML |
| **HTML / CSS / JS / Node.js** | Desarrollo del frontend y backend |
| **Firebase / MySQL** | Almacenamiento de datos |
| **Trello / Notion** | Planificación y seguimiento de tareas |

---

## 7. Planificación y Control
### 7.1 Cronograma de avance
| Semana | Actividad | Estado |
|---------|------------|--------|
| 6 | Modelado de casos de uso | Implementado |
| 7 | Diagramas de clases | Implementado |
| 8 | Arquitectura del software | Implementado |
| 9 | Gestión de versiones (Git/GitHub) | Implementado |
| 10 | Documentación técnica inicial | Implementado |
| 11 | Integración de módulos y pruebas | En revisión |

### 7.2 Control de versiones
- Rama principal: `main`  
- Ramas secundarias: `feat/`, `fix/`, `docs/`  
- Último commit:  
  ```bash
  git log -1
  ```
