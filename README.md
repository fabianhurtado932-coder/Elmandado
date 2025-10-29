[Readme.md](https://github.com/user-attachments/files/23221157/Readme.md)
# 🧩 Proyecto Formativo – Ingeniería de Software I

## 📌 Información General
**Nombre del Proyecto:**  
<!-- El mandado -->

**Equipo de Desarrollo:**  
<!--Marco Antonio Segura Cuero, Fabian Andres Hurtado Viafara, Carlos Eduardo Ñañez Gonzales -->

**Programa:** Ingeniería de Software I  
**Institución:** UNAD – Instituto Técnico Profesional  
**Grupo:** S441B-2  
**Versión del Documento:** v2 (Sesión 11)  
**Fecha de actualización:** <!-- Ej: 21/10/2025 -->

---

## 🎯 1. Descripción General del Proyecto
<!-- Resume el propósito del software: qué problema soluciona, quién lo usará, cuál es su objetivo principal. -->

El proyecto busca desarrollar una plataforma de gestión de pedidos que permita a los usuarios consultar menús, realizar pedidos y comunicarse con los restaurantes o repartidores, promoviendo una experiencia más ágil e intuitiva al momento de ordenar comida.
---

## 🧠 2. Contexto y Justificación
<!-- Explica por qué se escogió este proyecto, cuál es su impacto y relevancia técnica o social. -->
Se eligió este proyecto porque responde a la creciente demanda de soluciones digitales para pedir comida de forma rápida y sencilla. Su impacto social radica en facilitar a los usuarios el acceso a diferentes opciones gastronómicas y en apoyar a los restaurantes locales al ampliar su alcance. En el ámbito técnico, es relevante por integrar tecnologías modernas que mejoran la experiencia del usuario, la gestión de pedidos y la comunicación en tiempo real.
---

## 🧩 3. Requisitos del Sistema

### 3.1 Requisitos Funcionales
| Código | Descripción | Estado |
|--------|--------------|--------|

<img width="929" height="500" alt="image" src="https://github.com/user-attachments/assets/f8a66cf0-9921-43fe-8c78-883cd42ed47a" />

| RF-01 | El sistema debe permitir registrar usuarios. | ✅ Implementado |
| RF-02 | El sistema debe permitir iniciar sesión con autenticación segura. | 🔄 En desarrollo |
| RF-03 | El sistema debe generar reportes de uso. | ⏳ Pendiente |

### 3.2 Requisitos No Funcionales
| Código | Descripción | Tipo |
|--------|--------------|------|

<img width="925" height="480" alt="image" src="https://github.com/user-attachments/assets/45fb50ef-5f17-422f-a0b8-20e53d97e7c9" />

| RNF-01 | La interfaz debe ser responsiva en escritorio y móvil. | Usabilidad |
| RNF-02 | La base de datos debe soportar al menos 1000 registros. | Rendimiento |
| RNF-03 | Los datos deben almacenarse de forma segura. | Seguridad |

---

## 🧭 4. Modelos del Sistema

### 4.1 Diagrama de Casos de Uso
<!-- Inserta aquí una imagen o enlace al diagrama actualizado -->
![Casos de Uso](./docs/diagramas/casos_de_uso.png)

### 4.2 Diagrama de Clases
<!-- Inserta aquí una imagen o enlace -->
![Diagrama de Clases](./docs/diagramas/diagrama_clases.png)

### 4.3 Arquitectura del Software
<!-- Explica brevemente la estructura arquitectónica y su lógica -->
**Tipo de arquitectura:** Por capas (Presentación, Lógica de Negocio, Datos)

**Descripción:**
- **Capa de presentación:** interfaz gráfica o visual del sistema.  
- **Capa lógica:** procesos y reglas de negocio.  
- **Capa de datos:** almacenamiento y consultas a la base de datos.  

**Diagrama de Arquitectura:**
![Arquitectura del Sistema](./docs/diagramas/arquitectura.png)

---

## ⚙️ 5. Componentes Principales
| Componente | Función | Interacción | Estado |
|-------------|----------|-------------|--------|
| GestorUsuarios | Registrar, autenticar y administrar usuarios | Base de datos, interfaz | ✅ |
| GestorCursos | Crear y listar cursos | GestorUsuarios | 🔄 |
| GestorReportes | Generar informes del sistema | Base de datos | ⏳ |

---

## 🧰 6. Tecnologías y Herramientas
| Herramienta | Uso dentro del proyecto |
|--------------|------------------------|
| **Git** | Control de versiones local |
| **GitHub** | Repositorio remoto y trabajo colaborativo |
| **Draw.io / StarUML** | Diagramas UML |
| **Lucidchart / Canva** | Esquematización visual |
| **Unity / Python / HTML-CSS-JS (según caso)** | Desarrollo técnico |
| **Trello / Notion / Excel** | Planificación y seguimiento |

---

## 📅 7. Planificación y Control
### 7.1 Cronograma de avance
| Semana | Actividad | Estado |
|---------|------------|--------|
| 6 | Modelado de casos de uso | ✅ |
| 7 | Diagramas de clases | ✅ |
| 8 | Arquitectura del software | ✅ |
| 9 | Gestión de versiones (Git/GitHub) | ✅ |
| 10 | Documentación técnica inicial | ✅ |
| 11 | Avance del proyecto final | 🔄 En revisión |

### 7.2 Control de versiones
- Rama principal: `main`
- Ramas secundarias: `feat/`, `fix/`, `docs/`
- Último commit:  
  ```bash
  git log -1
