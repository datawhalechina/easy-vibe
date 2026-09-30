# De prototipo de diseño a código de proyecto

::: tip 🎯 Pregunta central
**¿Cómo convertir los prototipos de las herramientas de diseño en código frontend que realmente funcione en el navegador?**
:::

---

## 1. Tres caminos del prototipo al código

Después de completar el diseño de interfaces con herramientas modernas como Figma o MasterGo, surge naturalmente una pregunta práctica: ¿cómo se convierten estos mockups estructuralmente completos en código frontend que realmente funcione en el navegador?

Generalmente, la materialización de prototipo a código tiene tres caminos típicos:

| Camino | Método | Características | Escenarios |
|------|------|------|----------|
| **Camino 1** | Usar AI multimodal para generar código directamente a partir de imágenes | Flexible, no requiere herramientas específicas | Verificación rápida de prototipos, páginas simples |
| **Camino 2** | Exportar código usable a través de capacidades de la plataforma o plugins | Alta fidelidad de reproducción, buena editabilidad | Usuarios de Figma/MasterGo |
| **Camino 3** | Exportar código combinando plataforma con capacidades MCP | Alto grado de automatización, personalizable | Flujos de trabajo que necesitan integración profunda |

Este artículo detalla los métodos de implementación específicos de estos tres caminos, ayudándote a elegir el flujo de trabajo más adecuado según las necesidades de tu proyecto.

::: tip 📚 Conocimientos previos
Antes de comenzar esta sección, te recomendamos estudiar primero el tutorial [Introducción a Figma y MasterGo](../figma-mastergo/) para dominar las operaciones básicas de las herramientas de diseño frontend.
:::

---

## 2. Camino 1: AI multimodal para generar código directamente

Los LLM con capacidades visuales tienen la habilidad nativa de convertir imágenes en código. Solo necesitamos importar las capturas del mockup al chat y pedirle al modelo que genere el código completo.

### 2.1 Flujo de operación

1. **Capturar imagen del mockup**
   - En Figma o MasterGo, exportar la página diseñada como PNG o JPG
   - Asegurar que la captura incluya el layout completo de la página

2. **Seleccionar modelo AI multimodal**
   - Puedes usar Gemini, Qwen, Claude u otros modelos que soporten entrada de imagen
   - Aquí usamos Gemini como ejemplo

3. **Escribir el prompt**
   ```
   Por favor, genera el código HTML/CSS correspondiente a este mockup de diseño.
   Requisitos:
   - Usar layout CSS moderno (Flexbox/Grid)
   - Diseño responsive, adaptado a diferentes tamaños de pantalla
   - Incluir todos los elementos UI visibles
   - Reproducir lo más fielmente posible los colores y tamaños de fuente del diseño
   ```

![](/zh-cn/stage-2/frontend/design-to-code/images/image42.png)

4. **Obtener y guardar el código**
   - Pedir al modelo que retorne el código HTML completo
   - Guardar como archivo `.html` individual para pruebas locales
   - Posteriormente puedes convertirlo a React u otros frameworks en tu IDE local

### 2.2 Problemas comunes y soluciones

| Problema | Solución |
|------|----------|
| Distribución desigual de la interfaz | Describir a la AI los problemas específicos de layout, pedir ajustes de margin/padding CSS |
| Interfaz incompleta | Verificar si se configuró el viewport correcto, pedir breakpoints responsive |
| Colores no fieles | Usar herramientas de color para obtener valores exactos del mockup y proporcionarlos a la AI |
| Fuente no coincidente | Especificar el nombre exacto de la fuente o pedir uso de Google Fonts como alternativa |

::: tip 💡 Consejo
Se recomienda generar primero código HTML, y luego usar tu IDE local para convertirlo a framework React. Así obtienes múltiples archivos HTML independientes para conversión unificada de framework.
:::

### 2.3 Generación de páginas con MasterGo AI

MasterGo también proporciona una potente función de generación de páginas con AI que puede generar código web utilizable directamente a partir de imágenes de referencia.

#### Encontrar la entrada de funciones AI

En la barra de herramientas superior de la interfaz de edición de MasterGo, puedes encontrar el botón de herramientas AI:

![](/zh-cn/stage-2/frontend/design-to-code/images/image47.png)

#### Flujo de generación

1. **Subir imagen de referencia**
   - Usar el mismo método que con AI multimodal para subir la imagen de referencia del diseño
   - Agregar una descripción textual de los requerimientos

2. **Ver el resultado generado**

![](/zh-cn/stage-2/frontend/design-to-code/images/image48.webp)

![](/zh-cn/stage-2/frontend/design-to-code/images/image49.webp)

3. **Obtener el código**
   - Hacer clic en el botón azul "Insertar en lienzo" para editar la página generada directamente
   - O hacer clic en el botón "Código" a la derecha para copiar el contenido del código a local

![](/zh-cn/stage-2/frontend/design-to-code/images/image50.png)

---

## 3. Camino 2: Exportar código mediante capacidades de la plataforma o plugins

### 3.1 Generar código con Figma Make

Figma Make es la herramienta de diseño AI oficial de Figma que puede reproducir con alta precisión interfaces UI de prototipos web basándose en prompts del usuario o imágenes de referencia.

#### Características

- **Alta precisión de reproducción**: Mejores resultados comparados con generación de código AI nativa
- **Editabilidad**: Los resultados generados pueden convertirse en archivos Figma Design editables
- **Integración con GitHub**: Soporta sincronización directa de código a GitHub

::: tip 🔑 Nota sobre permisos
Usar la funcionalidad completa de Figma Make requiere permisos de usuario Pro. Los estudiantes pueden obtener permisos Pro gratis a través de la verificación educativa.
:::

#### Pasos de operación

1. **Entrar a Figma Make**
   - Hacer clic en el botón Make en la página principal de Figma
   - O visitar [Figma Make](https://www.figma.com/make)

2. **Subir imagen de referencia**
   - Subir la imagen de diseño que quieres reproducir al chat
   - Agregar un prompt describiendo los requerimientos

![](/zh-cn/stage-2/frontend/design-to-code/images/image43.webp)

3. **Ver el resultado generado**
   - Esperar un momento para ver el resultado renderizado
   - Hacer clic en el botón de reproducción de la esquina superior derecha para vista previa completa

![](/zh-cn/stage-2/frontend/design-to-code/images/image44.webp)

4. **Ajustes de detalle**
   - Hacer clic en el icono del editor de la esquina superior derecha
   - Volver a la interfaz familiar del Editor de Figma para ajustes detallados

![](/zh-cn/stage-2/frontend/design-to-code/images/image45.webp)

5. **Exportar código**
   - Una vez satisfecho con los ajustes, seleccionar exportar código
   - Puedes conectarte directamente a GitHub para guardar el código

![](/zh-cn/stage-2/frontend/design-to-code/images/image46.png)

### 3.2 Exportar código con plugins

Además de las funciones AI nativas de la plataforma, tanto Figma como MasterGo soportan la exportación de código a través de plugins:

**Plugins populares de Figma:**
- **Figma to Code**: Convierte mockups en código React, Vue, HTML, etc.
- **Anima**: Generación de código de alta fidelidad, soporta efectos de interacción
- **Locofy**: Herramienta de diseño a código impulsada por AI

**Pasos de uso:**
1. Abrir el panel de plugins en Figma
2. Buscar e instalar el plugin de exportación de código deseado
3. Seleccionar los elementos de diseño a exportar
4. Ejecutar el plugin, elegir el framework objetivo y formato de código
5. Copiar o descargar el código generado

---

## 4. Camino 3: Exportar código combinando plataforma con capacidades MCP

### 4.1 ¿Qué es MCP?

MCP (Model Context Protocol, Protocolo de Contexto de Modelo) es un protocolo estándar abierto que permite a los modelos AI acceder de forma segura y controlada a herramientas externas y fuentes de datos. En el contexto de las herramientas de diseño frontend, MCP permite a los LLM leer directamente la estructura, estilos e información de componentes de los archivos de diseño, generando código más preciso.

### 4.2 Cómo funciona MCP

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Modelo AI  │ ←→  │  Servidor MCP│ ←→  │  Herramienta  │
│  (Claude etc)│     │  (Adaptador) │     │(Figma/MasterGo)│
└─────────────┘     └─────────────┘     └─────────────┘
```

**Flujo de trabajo:**
1. El modelo AI envía una petición a la herramienta de diseño a través del protocolo MCP
2. La herramienta de diseño retorna datos de diseño estructurados (capas, estilos, componentes, etc.)
3. El modelo AI entiende la estructura del diseño y genera el código correspondiente
4. El código puede exportarse directamente o sincronizarse con el entorno de desarrollo

### 4.3 Práctica: Figma + MCP

#### Preparación del entorno

1. **Instalar servidor MCP**
   ```bash
   # Instalar servidor MCP de Figma con npx
   npx figma-mcp-server
   ```

2. **Configurar Claude Desktop u otra herramienta AI que soporte MCP**
   ```json
   {
     "mcpServers": {
       "figma": {
         "command": "npx",
         "args": ["figma-mcp-server"],
         "env": {
           "FIGMA_ACCESS_TOKEN": "tu-token-de-figma"
         }
       }
     }
   }
   ```

3. **Obtener Figma Access Token**
   - Iniciar sesión en Figma → Settings → Personal Access Tokens
   - Generar un nuevo Token y guardarlo

### 4.4 Ventajas de MCP

| Característica | Método tradicional | Método MCP |
|------|----------|----------|
| **Precisión de datos** | Depende de capturas, puede perder detalles | Lectura directa de datos de diseño originales |
| **Reconocimiento de componentes** | La AI debe adivinar los límites | Obtención precisa de definiciones de componentes |
| **Fidelidad de estilos** | Estimación basada en píxeles | Obtención de tokens de diseño exactos |
| **Eficiencia de iteración** | Cada modificación requiere nueva captura | Sincronización en tiempo real de cambios de diseño |
| **Grado de automatización** | Copiar y pegar manualmente | Escritura directa en archivos del proyecto |

### 4.5 Herramientas MCP disponibles actualmente

**MCP de herramientas de diseño:**
- **Figma MCP Server**: Implementación MCP con soporte oficial
- **MasterGo MCP**: Adaptador de MasterGo desarrollado por la comunidad

**MCP de entornos de desarrollo:**
- **Claude Code**: Soporte nativo del protocolo MCP
- **Cline**: Plugin de VS Code, soporta conexiones MCP
- **Trae**: Puede habilitar funciones MCP mediante configuración

::: tip 🔮 Perspectivas futuras
El protocolo MCP se está desarrollando rápidamente, y la integración entre herramientas de diseño y entornos de desarrollo será aún más estrecha en el futuro. Se espera que aparezcan más soluciones de sincronización de diseño a código con un solo clic, acortando aún más la distancia entre diseño y desarrollo.
:::

---

## 5. Trabajo posterior a la exportación de código

### 5.1 Pruebas locales

Después de obtener el código, ábrelo en tu IDE local y pruébalo:

1. **Crear nuevo proyecto**
   ```bash
   # Si es un archivo HTML, abrirlo directamente en el navegador
   open index.html

   # Si es un proyecto React/Vue
   npm install
   npm run dev
   ```

2. **Colaborar con AI IDE**
   - Importar el código generado a Trae u otro AI IDE
   - Pedir a la AI que ayude a corregir problemas de layout y agregar funciones interactivas

### 5.2 Manejo de problemas comunes

| Etapa | Problema | Solución |
|------|------|----------|
| Layout | Elementos desalineados | Verificar propiedades display y position del CSS |
| Estilos | Colores inconsistentes | Usar herramientas de desarrollo del navegador para verificar valores de color aplicados |
| Responsive | Visualización anómala en móvil | Agregar breakpoints de media query |
| Interacción | Botones sin respuesta | Verificar bindings de eventos JavaScript |

---

## 6. Comparación de los tres caminos y recomendaciones de selección

### 6.1 Comparación

| Dimensión | Camino 1: AI multimodal | Camino 2: Cap. plataforma | Camino 3: MCP |
|------|------------------|------------------|-------------|
| **Dificultad** | ⭐ Simple | ⭐⭐ Media | ⭐⭐⭐ Compleja |
| **Precisión** | ⭐⭐⭐ Media | ⭐⭐⭐⭐ Alta | ⭐⭐⭐⭐⭐ Máxima |
| **Flexibilidad** | ⭐⭐⭐⭐⭐ Alta | ⭐⭐⭐ Media | ⭐⭐⭐⭐ Alta |
| **Automatización** | ⭐⭐ Baja | ⭐⭐⭐ Media | ⭐⭐⭐⭐⭐ Máxima |
| **Costo** | Bajo (por llamada API) | Medio (puede requerir Pro) | Bajo (herramientas open source) |

### 6.2 Recomendaciones

**Elige el Camino 1 (AI multimodal) si:**
- Necesitas verificar ideas rápidamente
- Usas diferentes herramientas de diseño, cambias frecuentemente
- No tienes requisitos altos de fidelidad de reproducción
- Tienes presupuesto limitado

**Elige el Camino 2 (capacidades de plataforma) si:**
- Tu equipo usa principalmente Figma o MasterGo
- Necesitas reproducción de código de alta precisión
- Diseñadores y desarrolladores necesitan colaborar frecuentemente
- Estás dispuesto a invertir en versiones Pro

**Elige el Camino 3 (MCP) si:**
- Buscas el máximo grado de automatización
- Tienes capacidad técnica para configurar entornos MCP
- El proyecto necesita iteración frecuente de diseño a código
- Quieres establecer un flujo de trabajo estandarizado de diseño a desarrollo

---

## 7. Resumen

A través de esta sección, ya dominas los tres caminos principales del prototipo de diseño al código:

1. **Conversión directa con AI multimodal**: Flexible y rápido, adecuado para verificación de prototipos
2. **Capacidades nativas de plataforma**: Alta fidelidad de reproducción, adecuado para flujos de trabajo de diseño profesional
3. **Integración con protocolo MCP**: Máximo grado de automatización, representa la tendencia futura

::: tip 💡 Mejores prácticas
- **Recomendado para principiantes**: Empezar con el Camino 1 (AI multimodal) para una curva de aprendizaje suave
- **Colaboración en equipo**: Usar el Camino 2 (capacidades de plataforma) para asegurar consistencia de diseño
- **Prioridad de eficiencia**: Probar el Camino 3 (MCP) para establecer flujos de trabajo automatizados
- **Uso mixto**: Cambiar flexiblemente entre diferentes caminos según la fase del proyecto
:::

---

## Recursos de referencia

- [Introducción a Figma y MasterGo](../figma-mastergo/) - Aprender las bases de herramientas de diseño
- [Retratos de Hogwarts](../hogwarts-portraits/) - Proyecto práctico completo
- [Documentación oficial de MCP](https://modelcontextprotocol.io/) - Conocer detalles del protocolo
- [Documentación oficial de Figma Make](https://help.figma.com/hc/en-us/sections/360007453634-Figma-Make)
- [Tutoriales de MasterGo AI](https://mastergo.com/tutorials)
