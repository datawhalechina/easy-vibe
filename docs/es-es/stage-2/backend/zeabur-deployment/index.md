# Publica tu sitio web (fácil): despliegue PaaS con un clic

> 💡 **¿Qué significa "publicar un sitio web en Internet"?** También se llama "salir a producción" o "desplegar/publicar". Un sitio web que construiste en tu propio ordenador solo puede abrirlo tú. **Publicarlo en Internet significa colocarlo en un servidor que funciona las 24 horas, para que cualquier persona pueda escribir una URL en su navegador y visitarlo** — igual que un documento de Word que solo tú puedes leer se vuelve visible para todos cuando lo publicas en un blog; la diferencia es que esta vez estás publicando un sitio web completo.

En este tutorial, veremos la **forma más fácil de poner un sitio en línea — sin comprar un servidor, sin aprender DevOps**. Solo conecta tu repositorio de GitHub, haz clic en unos pocos botones y tu sitio estará en línea. Cubrimos cuatro plataformas populares: **Tencent Cloud CloudBase**, **Vercel**, **Netlify** y **Zeabur**.

# ¿Por qué usar una plataforma PaaS en lugar de montar tu propio servidor?

Quizás te preguntes: si al final todo acaba "en un servidor", ¿por qué no comprar tu propio servidor y desplegar allí? La respuesta: **las plataformas se encargan de todas las partes complicadas por ti**.

Si realizas el despliegue manualmente, un proyecto suele requerir varios pasos, y cada uno puede tener sus complicaciones. Los pasos clave más comunes son:

1. **Preparación del servidor**: Primero necesitas comprar un servidor en la nube (como Alibaba Cloud, Tencent Cloud o AWS EC2), elegir la región del servidor (por ejemplo, Shanghái, Singapur), la configuración (CPU, memoria, tamaño del disco, etc.) y aprender a conectarte remotamente al servidor (por ejemplo, mediante herramientas SSH).
   ![](/zh-cn/stage-2/backend/zeabur-deployment/images/image2.png)
2. **Configuración del entorno**: Las aplicaciones web necesitan un "entorno" específico para funcionar; por ejemplo, para ejecutar un proyecto Node.js debes instalar primero Node.js, y para un proyecto Python, debes instalar Python y las bibliotecas de terceros correspondientes. Si la versión del entorno no coincide, el programa puede dar errores o no iniciar.
3. **Subida de recursos**: Necesitas subir el código y los recursos locales al servidor, utilizando métodos como FTP o Git. Si el proyecto es grande (por ejemplo, si contiene archivos de vídeo), una interrupción de la conexión puede obligarte a reiniciar la subida.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image3.png)

4. **Inicio del servicio y pruebas**: Una vez completada la subida, debes ejecutar comandos en el servidor para iniciar la aplicación y verificar si "la dirección de red asignada es accesible". Si no se puede acceder, puede deberse a que el firewall del servidor no ha abierto el puerto correspondiente (por ejemplo, tu aplicación escucha en el puerto 3000, pero ese puerto está bloqueado por el firewall), o puede haber un error en el propio programa, en cuyo caso deberás revisar los registros del servidor para diagnosticar el problema.
   > 💡 Puedes entender el puerto como el "número de habitación" que distingue las diferentes aplicaciones en un mismo dispositivo, mientras que la IP es el "número de puerta" del dispositivo. La combinación de IP y puerto (IP:puerto) permite localizar con precisión un servicio de red específico.
5. **Mantenimiento y actualización**: Cada vez que modifiques el código, deberás volver a subirlo y reiniciar el servicio. Si el servidor se cae (por ejemplo, por un corte de energía o un fallo de red), tendrás que reiniciar la aplicación manualmente, y en ocasiones deberás configurar además una "herramienta de guardianía de procesos" para que el programa se reinicie automáticamente si se cierra de forma anómala.

Plataformas de "despliegue de bajo código" como CloudBase, Vercel y Zeabur nacieron precisamente para resolver estos problemas complejos. Se encargan automáticamente de "comprar servidores, configurar entornos, subir código, iniciar servicios y supervisar la ejecución". Solo necesitas conectar tu repositorio de código (como GitHub o GitLab) a la plataforma, o subir el código directamente, y la plataforma se encargará de descargar el código, identificar el tipo de aplicación, configurar el entorno de ejecución correspondiente y, finalmente, darte una dirección pública accesible para cualquier persona. Incluso puedes vincular tu propio dominio con un solo clic.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image4.webp)

A continuación, presentaremos las características y los métodos de uso de cada plataforma, para ayudarte a elegir la solución de despliegue que mejor se adapte a tus necesidades.

---

# Comparación de plataformas de despliegue

| Plataforma | Características | Casos de uso | Cuota gratuita |
|------|------|----------|----------|
| **Tencent CloudBase** | Velocidad de acceso rápida en China continental, integración profunda con el ecosistema WeChat | Proyectos orientados al mercado chino que necesitan soporte para mini programas de WeChat | Dispone de cuota gratuitas |
| **Vercel** | Buen soporte para frameworks frontend, integración estrecha con GitHub | Proyectos frontend modernos como React/Vue/Next.js | Dispone de cuota gratuita |
| **Netlify** | Funcionalidad completa, soporte para procesamiento de formularios y autenticación, buena integración con Git | Sitios estáticos que necesitan funcionalidades avanzadas como procesamiento de formularios y autenticación | Dispone de cuota gratuita |
| **Zeabur** | Soporta múltiples lenguajes y plantillas de servicios, configuración flexible | Proyectos complejos que necesitan desplegar múltiples servicios (como Dify, n8n) | Aproximadamente 5 USD gratuitos al mes |

---

# 1. Tencent CloudBase

Tencent CloudBase (Cloud Development) es un servicio en la nube backend todo en uno proporcionado por Tencent Cloud, especialmente adecuado para desarrolladores en China. Sus ventajas son:

- **Velocidad de acceso rápida en China**: Los servidores están ubicados en China continental, con baja latencia de acceso
- **Integración con el ecosistema WeChat**: Permite conectar fácilmente con mini programas y cuentas oficiales de WeChat
- **Solución todo en uno**: Ofrece alojamiento de sitios estáticos, funciones en la nube, bases de datos, almacenamiento y más
- **Cuotas gratuitas generosas**: Los desarrolladores individuales disponen de amplias cuotas de recursos gratuitos

## Usar CloudBase para desplegar aplicaciones web

### Paso 1: Registro e inicio de sesión

Accede a la [consola de Tencent CloudBase](https://console.cloud.tencent.com/tcb) e inicia sesión con WeChat o QQ.

### Paso 2: Crear un entorno

Haz clic en "Nuevo entorno" y elige un nombre para el entorno (como `my-web-app`).

> ⚠️ **Nota**: La versión de prueba gratuita de CloudBase requiere un código de canje para activarse. Debes seguir la cuenta oficial de Tencent CloudBase en WeChat, enviar "领取兑换码" (solicitar código de canje) para obtenerlo, y luego introducir el código al crear el entorno para activar el entorno gratuito (el período de prueba gratuito es de 6 meses).

### Paso 3: Activar el alojamiento de sitios estáticos

En la página de gestión del entorno, busca la función "Alojamiento de sitios estáticos" y actívala. Una vez activada, recibirás un dominio de acceso predeterminado.

El alojamiento de sitios estáticos de CloudBase ofrece múltiples métodos de despliegue, similares a Zeabur:

- **Subida de proyecto local**: Sube directamente archivos estáticos ya compilados (HTML, CSS, JS, etc.) desde tu ordenador
- **Despliegue desde plantilla**: Crea proyectos rápidamente usando plantillas preestablecidas, como plantillas de aplicaciones web React o Vue
- **Despliegue desde repositorio Git**: Permite descargar código automáticamente desde repositorios como GitHub y desplegarlo

### Paso 4: Desplegar el código

En la página de alojamiento de sitios estáticos, CloudBase ofrece tres métodos de despliegue:

**Método 1: Despliegue de proyecto local (subida de proyecto local)**
- Selecciona "Despliegue de proyecto local" en la consola
- Sube directamente los archivos estáticos compilados (HTML, CSS, JS, etc.)
- Selecciona la carpeta de tu proyecto compilado localmente (como el directorio `dist` o `build`)
- Espera a que se complete la subida para acceder

**Método 2: Despliegue desde plantilla**
- Crea proyectos rápidamente usando plantillas preestablecidas
- Soporta plantillas de aplicaciones web React, Vue, etc.
- Construcción y despliegue automáticos basados en la plantilla

**Método 3: Despliegue desde repositorio Git**
- **Despliegue desde repositorio personal de Git**: Vincula tu repositorio personal de GitHub u otras plataformas
- **Despliegue desde repositorio público**: Permite descargar código desde repositorios Git públicos
- Configura comandos de construcción automática (como `npm run build`)
- Cada vez que envías código, se redespliega automáticamente

> 💡 **Consejo**: También puedes usar la herramienta CLI para desplegar:
> ```bash
> # Instalar CloudBase CLI
> npm install -g @cloudbase/cli
> # Iniciar sesión
> tcb login
> # Desplegar
> tcb hosting deploy ./dist -e your-env-id
> ```

### Paso 5: Configurar un dominio personalizado (opcional)

En la configuración de alojamiento de sitios estáticos, puedes vincular tu propio dominio y solicitar un certificado HTTPS gratuito.

---

# 2. Vercel

Vercel es una de las plataformas de despliegue frontend más populares del mundo, especialmente adecuada para desplegar proyectos con frameworks frontend modernos como React, Vue y Next.js. Sus características incluyen:

- **Integración profunda con GitHub**: El despliegue es automático al enviar código
- **Previsualización automática**: Cada Pull Request genera un enlace de previsualización independiente
- **CDN global**: El sitio web se distribuye automáticamente a nodos de todo el mundo, con alta velocidad de acceso
- **Funciones Serverless**: Permite escribir APIs backend dentro del proyecto

> ⚠️ **Nota**: El acceso a Vercel puede ser inestable en algunos entornos de red. Para usuarios en China, se recomienda priorizar CloudBase.

## Usar Vercel para desplegar aplicaciones web

### Paso 1: Crear una cuenta

Visita el [sitio oficial de Vercel](https://vercel.com) e inicia sesión con tu cuenta de GitHub.

### Paso 2: Importar el proyecto

1. Haz clic en "Add New Project"
2. Selecciona el repositorio de GitHub que deseas desplegar
3. Si no ves el repositorio que buscas, haz clic en "Adjust GitHub App Permissions" para autorizar el acceso

### Paso 3: Configurar los ajustes de construcción

Vercel identificará automáticamente el tipo de proyecto y configurará los comandos de construcción:

| Framework | Comando de construcción | Directorio de salida |
|------|----------|----------|
| React | `npm run build` | `build` |
| Vue | `npm run build` | `dist` |
| Next.js | `next build` | - |
| HTML puro | - | Directorio raíz del proyecto |

Si la detección automática no es correcta, puedes modificarla manualmente:
- **Build Command**: Comando de construcción, como `npm run build`
- **Output Directory**: Directorio de salida de la construcción, como `dist` o `build`
- **Install Command**: Comando de instalación de dependencias, normalmente `npm install`

### Paso 4: Desplegar

Haz clic en el botón "Deploy" y espera a que se complete la construcción. Una vez exitosa, recibirás un dominio con el formato `xxx.vercel.app`.

### Paso 5: Dominio personalizado (opcional)

En la página "Domains" de la configuración del proyecto, puedes añadir tu propio dominio. Vercel configurará HTTPS automáticamente.

---

# 3. Netlify

Netlify es otra plataforma de despliegue frontend muy popular, similar a Vercel, especialmente adecuada para desplegar sitios estáticos y aplicaciones de página única (SPA). Sus características incluyen:

- **Funcionalidad completa**: Además del alojamiento de sitios estáticos, soporta procesamiento de formularios, autenticación, funciones edge y otras funciones avanzadas
- **Integración profunda con Git**: Soporta GitHub, GitLab y Bitbucket; el despliegue es automático al enviar código
- **Previsualización por ramas**: Cada rama genera automáticamente un enlace de previsualización independiente
- **CDN global**: El sitio web se distribuye automáticamente a nodos de todo el mundo, con alta velocidad de acceso
- **Procesamiento de formularios**: Permite procesar envíos de formularios web sin necesidad de código backend
- **Autenticación**: Función de autenticación de usuarios integrada, permite implementar rápidamente inicio de sesión y registro

> ⚠️ **Nota**: La velocidad de acceso a Netlify desde China puede ser inferior a la de CloudBase. Se recomienda para proyectos orientados principalmente a usuarios internacionales.

## Usar Netlify para desplegar aplicaciones web

### Paso 1: Crear una cuenta

Visita el [sitio oficial de Netlify](https://www.netlify.com) y haz clic en "Sign up" para registrarte. Puedes usar GitHub, GitLab, Bitbucket o tu correo electrónico.

### Paso 2: Importar el proyecto

1. Tras iniciar sesión, haz clic en "Add new site" → "Import an existing project"
2. Selecciona tu plataforma de alojamiento de código (como GitHub)
3. Autoriza a Netlify para acceder a tus repositorios
4. Selecciona de la lista el repositorio que deseas desplegar

### Paso 3: Configurar los ajustes de construcción

Netlify detectará automáticamente los frameworks frontend más comunes y configurará los ajustes de construcción:

| Framework | Comando de construcción | Directorio de publicación |
|------|----------|----------|
| React | `npm run build` | `build` |
| Vue | `npm run build` | `dist` |
| Angular | `ng build` | `dist/<project-name>` |
| Next.js | `next build` | `out` |
| HTML puro | - | `.` (directorio raíz del proyecto) |

Si la detección automática no es correcta, puedes configurarlo manualmente:
- **Build command**: Comando de construcción, como `npm run build`
- **Publish directory**: Directorio de salida de la construcción, como `dist` o `build`

### Paso 4: Desplegar

Haz clic en el botón "Deploy site" y espera a que se complete la construcción. Una vez exitosa, recibirás un dominio con el formato `xxx.netlify.app`, y cualquier persona podrá acceder a tu sitio web a través de esa dirección.

### Paso 5: Configurar un dominio personalizado (opcional)

1. Accede a la configuración del sitio y haz clic en "Domain management"
2. Haz clic en "Add custom domain"
3. Introduce tu dominio y sigue las instrucciones para configurar los registros DNS
4. Netlify solicitará y configurará automáticamente un certificado HTTPS

### Funciones destacadas

#### 1. Procesamiento de formularios

Netlify ofrece una función muy práctica: procesar envíos de formularios sin necesidad de código backend.

Solo tienes que añadir el atributo `netlify` al formulario HTML:

```html
<form name="contact" netlify>
  <p>
    <label>Nombre: <input type="text" name="name" /></label>
  </p>
  <p>
    <label>Correo electrónico: <input type="email" name="email" /></label>
  </p>
  <p>
    <label>Mensaje: <textarea name="message"></textarea></label>
  </p>
  <p>
    <button type="submit">Enviar</button>
  </p>
</form>
```

Tras el despliegue, los datos enviados desde el formulario se enviarán automáticamente al panel de Netlify. Puedes ver todos los registros de envíos en la página "Forms", y también configurar notificaciones por correo electrónico o reenviar los datos a otros servicios.

#### 2. Netlify Functions (funciones edge)

Netlify permite desplegar funciones serverless (Serverless Functions), lo que te permite implementar interfaces API sencillas sin necesidad de montar un servidor backend completo. Puedes escribir funciones en JavaScript o TypeScript, y tras el despliegue obtendrás automáticamente una URL accesible.

Por ejemplo, crea un archivo `hello.js`:

```javascript
exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello from Netlify!" })
  };
};
```

Tras el despliegue, podrás acceder a esta función a través de `https://tu-dominio/.netlify/functions/hello`.

#### 3. Soporte para desarrollo local

Netlify proporciona una herramienta CLI para facilitar el desarrollo y las pruebas en local:

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Iniciar sesión en tu cuenta
netlify login

# Iniciar el servidor de desarrollo local
netlify dev

# Probar funciones localmente
netlify functions:serve
```

La herramienta CLI te permite simular el entorno de Netlify en local, incluyendo el envío de formularios y la invocación de funciones, lo que facilita las pruebas antes del despliegue.

---

# 4. Zeabur

Zeabur es una plataforma de despliegue emergente, especialmente adecuada para proyectos complejos que necesitan desplegar múltiples servicios. Sus ventajas son:

- **Amplia variedad de plantillas de servicios**: Incluye plantillas integradas para Dify, n8n, bases de datos y más
- **Soporta múltiples métodos de despliegue**: GitHub, plantillas, imágenes Docker, proyectos locales, etc.
- **Combinación flexible de servicios**: Permite desplegar múltiples servicios interrelacionados en un solo proyecto
- **Facturación por uso**: Pagas solo por lo que usas, ideal para proyectos experimentales

## Usar Zeabur para desplegar Dify

En lecciones anteriores ya tuvimos un primer contacto con Dify. Ahora, podemos iniciar nuestro propio servicio de Dify muy fácilmente a través de [Zeabur](https://zeabur.com/projects). Primero abre la [página de la consola](https://zeabur.com/projects) y echemos un vistazo a las diferentes áreas.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image5.webp)

En esta página, lo primero que verás son muchos bloques, que representan los servicios ya iniciados. En el menú superior verás varias opciones como Agent, Servers, Docs y Templates, que representan respectivamente:

1. **Agent**: Permite abrir el asistente inteligente (Agent) integrado en Zeabur, para preguntarle cómo realizar operaciones o consultar el estado actual del servidor.
2. **Servers**: Aquí puedes añadir servidores en la nube que hayas comprado, o comprar servidores directamente a través de Zeabur.
3. **Docs**: Consulta la documentación completa de Zeabur.
4. **Templates**: Aquí se listan todas las plantillas de imágenes integradas.

> La "imagen (Image)" mencionada aquí puede entenderse como un "paquete comprimido que contiene el código y el entorno de ejecución". Cuando un servicio se ejecuta correctamente en un servidor, podemos elegir empaquetar "este entorno de ejecución + código" como una imagen. Posteriormente, en cualquier servidor nuevo, basta con descomprimir y ejecutar este paquete, sin necesidad de configurar de nuevo el entorno y el código, y el servicio funcionará directamente.

En la esquina superior derecha de la página, también puedes ver tu saldo. Por defecto, hay una cuota gratuita de aproximadamente 5 USD al mes. No te preocupes demasiado por los detalles de facturación por ahora; solo necesitas saber que mientras el servidor esté en ejecución, consumirá saldo.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image6.png)

Haz clic en el saldo para ver los detalles del consumo diario.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image7.png)

Ahora vamos a crear nuestro propio servicio de Dify. Primero, en la [página principal de la consola](https://zeabur.com/projects), haz clic en "New Project".

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image8.png)

A continuación se explica cada método de creación:

1. **GitHub**
   Permite conectar tu cuenta de GitHub. Una vez vinculada, podrás seleccionar proyectos directamente desde tus repositorios de GitHub para desplegarlos (GitHub es actualmente la plataforma de alojamiento de código más grande del mundo).
2. **Template (plantilla)**
   Permite desplegar servicios basados en plantillas. Zeabur incluye muchas plantillas de proyectos preestablecidos (como Dify, n8n, etc.), y puedes crear y desplegar aplicaciones rápidamente a partir de estas plantillas.
   ![](/zh-cn/stage-2/backend/zeabur-deployment/images/image9.png)
3. **Databases (bases de datos)**
   Para desplegar servicios de bases de datos, como MySQL, MongoDB y otras bases de datos comunes.
   ![](/zh-cn/stage-2/backend/zeabur-deployment/images/image10.png)
4. **Functions (funciones)**
   Permite desplegar servicios de funciones. Puedes escribir código en JavaScript o Python y ejecutarlo como funciones invocables.
   ![](/zh-cn/stage-2/backend/zeabur-deployment/images/image11.png)

   ![](/zh-cn/stage-2/backend/zeabur-deployment/images/image12.png)

5. **Local Project (proyecto local)**
   Sube una carpeta local y Zeabur detectará automáticamente el script de inicio. Es ideal para desplegar rápidamente un proyecto que ya tienes desarrollado en local.
   ![](/zh-cn/stage-2/backend/zeabur-deployment/images/image13.png)
6. **Docker Image**
   Despliega una imagen Docker ya empaquetada. Si tu proyecto se ha convertido en una imagen Docker (por ejemplo, almacenada en Docker Hub u otro registro de imágenes), puedes desplegarla directamente aquí.
   ![](/zh-cn/stage-2/backend/zeabur-deployment/images/image14.png)
7. **Cursor**
   Si tienes instalado Cursor (por ejemplo, Cursor IDE), puedes usar esta opción para desplegar directamente tu proyecto de Cursor en Zeabur.

Si quieres desplegar tu propio servicio de Dify, te recomendamos elegir el método **Template** y luego escribir "dify" en el cuadro de búsqueda. Verás muchas versiones mantenidas por diferentes autores; puedes elegir cualquiera de ellas (por ejemplo, la versión v1.6.0).

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image15.png)

A continuación, introduce cualquier nombre y Zeabur generará un dominio personalizado temporal basado en ese nombre. Después, cualquier persona podrá acceder a tu servicio a través de esta URL.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image16.png)

Una vez completada la creación, verás múltiples programas (servicios) iniciándose secuencialmente. Debes esperar pacientemente a que todos los servicios entren en estado "iniciado". (El servicio de Dify está compuesto por múltiples programas, cada uno responsable de diferentes funciones, que colaboran entre sí.)

Generalmente, solo necesitas hacer clic en la aplicación de Dify en el lado izquierdo para ver la dirección de acceso predeterminada. Sin embargo, en este caso, como hay una capa de nginx por delante, debes hacer clic en el servicio de nginx para obtener la dirección de acceso final. Puedes entenderlo así: nginx es el programa principal responsable de "recibir y enviar solicitudes" de forma unificada hacia el exterior, y distribuye las direcciones de acceso externo a cada servicio interno. Haz clic en Nginx en el lado izquierdo, y en la página de detalles podrás ver la dirección actual del servicio. Luego abre esa dirección en el navegador y espera a que el servicio se inicie completamente.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image17.png)

Tras unos instantes, verás la pantalla de inicio de sesión de Dify. Introduce tu dirección de correo electrónico y una contraseña de registro, y podrás empezar a usar tu propio servicio de Dify.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image18.png)

Si te interesa, también puedes aprovechar para iniciar un servicio de n8n. n8n es otra plataforma de flujos de trabajo de IA muy popular a nivel internacional.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image19.png)![](/zh-cn/stage-2/backend/zeabur-deployment/images/image20.webp)

## Usar Zeabur y Trae para desplegar el juego Snake

En la siguiente parte de este tutorial, exploraremos algunos usos avanzados de Zeabur. Primero usaremos Trae para generar un pequeño juego de Snake, luego lo desplegaremos en el servidor de Zeabur y configuraremos un enlace de acceso público para que cualquier persona pueda abrir tu juego.

El primer paso es crear un proyecto de Snake en local usando Trae.

### Implementación con HTML

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image23.webp)

Para Trae, generar un juego web de Snake basado en HTML es muy sencillo. Una vez que el juego se haya generado, solo necesitas subir la carpeta que contiene todos los archivos siguiendo el método de despliegue local de Zeabur que describimos anteriormente.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image24.png)![](/zh-cn/stage-2/backend/zeabur-deployment/images/image25.png)![](/zh-cn/stage-2/backend/zeabur-deployment/images/image26.png)

Una vez completado, entrarás en la interfaz de detalles del servicio:

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image27.webp)

Haz clic en la opción "Network" en el lado izquierdo y busca el área "Public Address" en la página. Haz clic en "Generate Domain" para generar una dirección de acceso público; puedes introducir cualquier nombre que te guste.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image28.png)

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image29.png)

Una vez generada, abre esta dirección en el navegador y podrás ejecutar tu propio juego de Snake. Otras aplicaciones web de tipo HTML también pueden desplegarse exactamente de la misma manera.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image30.png)

### Implementación con React

Anteriormente aprendimos a desplegar aplicaciones web basadas en HTML. Ahora vamos a probar el despliegue con un framework frontend más utilizado actualmente: aplicaciones React. Comparado con HTML puro, React se considera un framework de desarrollo frontend más maduro y moderno. Organiza la estructura de la página mediante componentes, lo que acelera significativamente el desarrollo de páginas complejas, y es una opción muy popular en proyectos empresariales.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image31.webp)

#### Refactorización a arquitectura React

En Trae, solo tienes que indicarle al Agent: "Ayúdame a refactorizar este código a una arquitectura React", y podrás convertir fácilmente la estructura basada en HTML en un proyecto React.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image32.webp)

Sin embargo, comparado con los archivos HTML simples, las aplicaciones React dependen de herramientas de construcción y estructuras de proyecto más complejas, por lo que el proceso de despliegue también es algo más complicado. Un problema típico se refleja en la configuración de puertos: por defecto, las aplicaciones React suelen escuchar en el puerto 3000 (puedes ver esto en el archivo de configuración o en los registros de inicio).

Sin embargo, desplegar de esta manera en Zeabur fallará, porque Zeabur solo soporta aplicaciones que escuchan en el puerto 8080. Es decir, si quieres que una aplicación React funcione correctamente en Zeabur, primero debes cambiar el puerto de escucha predeterminado de 3000 a 8080.

Para configurar correctamente este paso, primero debemos aclarar dos conceptos: qué es un "puerto (Port)" y qué significa "puerto de escucha (Listening Port)".

#### ¿Qué es un puerto?

> En redes informáticas, un puerto puede entenderse como un "punto final de comunicación lógico" que se utiliza para distinguir los diferentes servicios de red que se ejecutan en un mismo dispositivo. Como analogía sencilla, si la dirección IP es como un "número de puerta" (por ejemplo, 162.128.1.1), entonces el número de puerto es como el "número de habitación" de las diferentes habitaciones en ese edificio; cada habitación corresponde a un servicio (por ejemplo, un servidor web, un servicio de correo, o tu aplicación React).
>
> Los números de puerto se representan con enteros de 16 bits, con un rango de 0 a 65535.

Si no quieres recordar estos detalles, puedes entenderlo de forma sencilla: el puerto es una parte necesaria que forma la "dirección de acceso a la red".

Cuando habitualmente accedemos a sitios web o direcciones IP, normalmente no añadimos manualmente el número de puerto porque el puerto predeterminado de la web es el 80 o 443 (HTTPS). La mayoría de los navegadores usan automáticamente estos puertos estándar. Sin embargo, para algunos puertos especiales, como el 3000 predeterminado de React o el 8080 que requiere Zeabur, debemos añadir `:3000` o `:8080` después de la dirección para poder acceder al contenido correspondiente.

#### ¿Qué es un "puerto de escucha"?

> El "puerto de escucha" se refiere al puerto que un programa "abre y monitoriza" activamente en un dispositivo. Cuando una aplicación establece un puerto de escucha, básicamente está diciendo al sistema operativo: "Estaré esperando solicitudes de red en este puerto; en cuanto llegue alguna, por favor reenvíamela."

Para entenderlo de forma más visual: imagina que tu ordenador es un edificio de oficinas y la dirección IP es la dirección del edificio. Hay muchas empresas o departamentos en el edificio, cada uno ocupando diferentes habitaciones, y los números de habitación son los números de puerto.

Cuando el servidor de desarrollo predeterminado de React se inicia, "abre" la puerta de una habitación y coloca a un "recepcionista" en la entrada; el número de esa habitación es su puerto de escucha: 3000.

Al mismo tiempo, el programa de React le dice a la "administración del edificio" (el sistema operativo): "Estoy en la habitación 3000, por favor reenvíame toda la correspondencia dirigida a esa habitación (las solicitudes de red)."

De esta manera, cuando accedes al sitio de React, la solicitud llega primero al edificio; la administración ve que la solicitud va dirigida a la habitación 3000 y la pasa inmediatamente al "recepcionista" de React, que la procesa y devuelve el resultado. Así es como funciona el acceso a una aplicación React.

Cuando ejecutas `npm start` en local (el comando predeterminado para iniciar el servidor de desarrollo de React, que también puedes ejecutar desde la barra lateral del Agent en Vibe Coding), el servidor de desarrollo de React establece automáticamente el puerto de escucha en 3000.
El diseño de la plataforma Zeabur determina que solo "reconocerá" aplicaciones que escuchen en el puerto 8080. Si tu aplicación React sigue usando el puerto 3000 predeterminado, Zeabur no podrá reenviar correctamente las solicitudes a tu aplicación, lo que provocará un fallo en el despliegue.

#### Modificar el puerto de escucha predeterminado

Hay muchas formas de cambiar el puerto de escucha predeterminado de React (3000) al 8080 que requiere Zeabur. La forma más sencilla es darle una instrucción directamente al Agent en Trae: "Por favor, cambia el puerto predeterminado de este proyecto React a 8080." Trae modificará los archivos de configuración correspondientes del proyecto. Una vez completada la modificación, solo tienes que volver a compilar y subir a Zeabur siguiendo el método anterior.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image33.webp)

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image34.png)

En la configuración de red, especifica una URL de acceso de la misma manera que cuando desplegaste el proyecto HTML, y podrás iniciar la versión React del servicio.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image35.webp)

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image36.png)

Para otros programas que necesiten modificar el número de puerto, puedes seguir el mismo enfoque: primero cambiar el puerto predeterminado y luego subir a Zeabur para desplegar. Con esto, ya has dominado las habilidades básicas para desplegar aplicaciones web comunes en un servidor.

Puedes intentar que Trae te ayude a construir diferentes tipos de aplicaciones y desplegarlas en los servidores predeterminados de Zeabur. En lecciones posteriores, también aprenderemos a desplegar aplicaciones en servidores en la nube que hayas comprado tú mismo.

---

# ⚠️ Cómo detener y eliminar proyectos (Zeabur)

Dado que la activación de recursos relacionados con el servidor genera costes, es importante adquirir el hábito de "cerrar rápidamente los servicios que no se utilizan" para evitar agotar la cuota gratuita mensual.

Para encontrar la gestión del proyecto, primero haz clic en la opción "Settings" del proyecto.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image21.webp)

Tras acceder a la página de configuración, desplázate hasta la parte inferior y verás una interfaz similar a esta:

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image22.png)

Puedes hacer clic en "Suspend All Services" para suspender todos los servicios y reducir los costes; si hay problemas con los servicios, puedes hacer clic en "Restart All Services" para reiniciar todos los servicios. Si estás seguro de que ya no necesitas este proyecto, puedes hacer clic en "Delete Project" para eliminarlo por completo.

---

# Resumen

En este tutorial, hemos presentado cuatro plataformas populares de despliegue de aplicaciones web:

1. **Tencent CloudBase**: Adecuada para usuarios en China, con velocidad de acceso rápida y buena integración con el ecosistema WeChat
2. **Vercel**: Adecuada para proyectos con frameworks frontend modernos, con integración estrecha con GitHub y CDN global
3. **Netlify**: Funcionalidad completa, soporte para procesamiento de formularios y autenticación, ideal para sitios estáticos que necesitan funciones avanzadas
4. **Zeabur**: Adecuada para proyectos complejos, con amplias plantillas de servicios y múltiples métodos de despliegue

La elección de la plataforma depende de tus necesidades específicas:
- Si tu público principal está en China, se recomienda **CloudBase**
- Si usas frameworks como React/Next.js, se recomienda **Vercel** o **Netlify**
- Si necesitas procesamiento de formularios, autenticación y otras funciones avanzadas, se recomienda **Netlify**
- Si necesitas desplegar servicios como Dify o n8n, se recomienda **Zeabur**

Independientemente de la plataforma que elijas, el flujo central del despliegue es similar: preparar el código → elegir la plataforma → configurar los ajustes de construcción → desplegar y publicar. Una vez que domines estas habilidades, ¡podrás compartir las aplicaciones que desarrolles con todo el mundo!
