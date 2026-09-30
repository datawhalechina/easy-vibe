# Flujo de trabajo de Git y GitHub

En las lecciones anteriores, aprendimos a escribir codigo usando herramientas de vibe coding basadas en la web. Cada conversacion crea una nueva version del codigo. Pero pensemos en una pregunta: si queremos volver a una modificacion anterior, hay alguna manera conveniente de hacerlo? Existe alguna herramienta que pueda registrar nuestro codigo en diferentes etapas, permitiendonos cambiar y modificar entre versiones en cualquier momento?

Para satisfacer esta necesidad, nacio el software de control de versiones. En este articulo, presentaremos el programa de control de versiones mas famoso, Git, y la mejor plataforma de alojamiento de codigo, GitHub. Aprenderemos a usar Git para la gestion de codigo, como obtener codigo de otros desde GitHub, como subir nuestro propio codigo y como colaborar con otros en proyectos grandes.

Ya sea para el seguimiento de versiones en proyectos personales, la sincronizacion de codigo en la colaboracion en equipo o para contribuir a la comunidad de codigo abierto, Git y GitHub son herramientas esenciales para los desarrolladores modernos. Al dominarlos, podras gestionar el codigo de manera mas eficiente, crear puntos de control segun sea necesario, cambiar libremente entre diferentes etapas del codigo y manejar todo, desde cambios en un solo archivo hasta el desarrollo de proyectos grandes, haciendo que cada iteracion de codigo sea controlable y rastreable.

> 💡 **Conocimientos previos**
>
> Antes de aprender Git, se recomienda que primero conozcas los siguientes conceptos:
> - [Que es terminal/linea de comandos](/es-es/appendix/2-development-tools/command-line-shell) - Aprender a usar la linea de comandos para interactuar con la computadora
> - [Que es Git](/es-es/appendix/2-development-tools/git-version-control) - Comprender los conceptos principales del sistema de control de versiones Git
>
> Este articulo se centrara en el flujo de trabajo de GitHub y las operaciones practicas. Para los conocimientos basicos anteriores, consulta los enlaces del apendice.

# Inicio rapido con Git

Antes de comenzar a usar Git, asegurate de haber leido el contenido del apendice sobre la [linea de comandos](/es-es/appendix/2-development-tools/command-line-shell) y los [fundamentos de Git](/es-es/appendix/2-development-tools/git-version-control). Este articulo asume que ya tienes estos conocimientos basicos y pasara directamente a explicar como instalar y configurar Git y usar GitHub para colaboracion.

## Como instalar Git

Demostraremos tres metodos para instalar Git en diferentes sistemas operativos. Sigue las instrucciones segun la version de tu sistema:

### Windows

1. Ve a la [pagina oficial de descarga de Git](https://git-scm.com/download/win) y descarga el instalador adecuado para tu sistema: [Instalador](https://github.com/git-for-windows/git/releases/download/v2.51.0.windows.1/Git-2.51.0-64-bit.exe). Por defecto, se recomienda usar el instalador x64.
2. Haz doble clic en el instalador y sigue las instrucciones del asistente de instalacion:
   ![](/zh-cn/stage-2/backend/git-workflow/images/image5.png)
   1. Se recomienda mantener las opciones predeterminadas. Si necesitas personalizar, ten en cuenta los siguientes puntos: (en la mayoria de los casos, puedes hacer clic en "Next" continuamente)
      - Seleccionar el editor predeterminado que usara Git: Elige tu editor favorito (como VS Code). Puedes seleccionar la primera opcion por defecto, que es Vim (un editor de texto), o elegir la opcion "Visual Studio Code as Git's default editor" (requiere tener VS Code preinstalado). Puedes mantener la seleccion predeterminada y hacer clic en "Next" para continuar.
        ![](/zh-cn/stage-2/backend/git-workflow/images/image6.png)
      - Seleccionar como usar Git: Estas tres opciones controlan la accesibilidad de Git en el sistema. Se recomienda elegir la opcion 2 ("from command line and 3rd-party software") - agrega las herramientas basicas de Git al PATH, permitiendote usar Git en Git Bash, Simbolo del sistema, PowerShell e IDEs sin desordenar el sistema.
        ![](/zh-cn/stage-2/backend/git-workflow/images/image7.png)

3. Despues de la instalacion, haz clic derecho en el escritorio. Si ves "Git Bash Here" en el menu, la instalacion fue exitosa.

![](/zh-cn/stage-2/backend/git-workflow/images/image8.png)

### MacOS

Para macOS, primero puedes escribir `git --version` en la terminal para verificar si Git ya esta instalado. Si no lo esta, el sistema te pedira que lo instales; simplemente sigue las instrucciones para completar la instalacion.

1. Metodo 1: Instalar a traves de Homebrew
   Si tienes [Homebrew](https://brew.sh/) instalado (el gestor de paquetes de Mac), abre la terminal y escribe
   ```bash
   brew install git
   ```
2. Metodo 2: (Recomendado) Instalar a traves de Xcode: https://developer.apple.com/xcode/ , Xcode incluye Git. Despues de instalar, simplemente sigue las instrucciones para continuar.

### Linux

La mayoria de las distribuciones de Linux pueden instalar Git a traves de su gestor de paquetes:

- Ubuntu/Debian:

```bash
sudo apt update
sudo apt install git
```

- CentOS/RHEL:

```bash
sudo yum install git
```

- Verificar la instalacion: Escribe git --version en la terminal. Si muestra el numero de version, la instalacion fue exitosa.

## Inicializacion de Git

Despues de instalar Git, primero necesitas configurar tu informacion de usuario; este es el paso basico para usar Git como sistema de control de versiones. Ejecuta los siguientes comandos en la terminal (reemplaza el contenido entre parentesis con tu propia informacion):

```bash
# Establecer el nombre de usuario global (se mostrara en los registros de commits)
git config --global user.name "Your Name"

# Establecer el correo electronico global (se recomienda usar el correo registrado en GitHub/GitLab)
git config --global user.email "your.email@example.com"
```

Git incluira esta informacion en cada commit como la "informacion del autor" de cada modificacion. Al revisar el historial de versiones (por ejemplo, usando git log), puedes ver claramente quien modifico cada linea de codigo, lo que facilita la trazabilidad de responsabilidades y la comunicacion. En proyectos colaborativos, la informacion de identidad unificada permite a los miembros del equipo identificar rapidamente quien hizo que cambios, mejorando la eficiencia de colaboracion (por ejemplo, encontrar al desarrollador relevante para discutir problemas a traves de los registros de commits).

Puedes verificar la configuracion actual de Git escribiendo `git config --list` en la linea de comandos para confirmar que la configuracion fue exitosa.

# Que es GitHub

GitHub es una plataforma de alojamiento de codigo basada en Git. No solo proporciona almacenamiento remoto para repositorios Git, sino que tambien incluye herramientas de colaboracion (como Issues, Pull Requests, Projects) que facilitan a los desarrolladores compartir codigo y colaborar. En resumen, Git es una herramienta local de control de versiones, mientras que GitHub es un "disco duro en la nube de repositorios de codigo + comunidad de colaboracion" remoto.

GitHub no solo es la plataforma de alojamiento de codigo mas grande del mundo, sino tambien la comunidad de codigo abierto mas activa e influyente a nivel global. Aqui, la idea principal de "codigo abierto" es que cualquier persona puede descargar y ejecutar el codigo fuente del software. Este modelo permite a personas de todo el mundo revisar el codigo de otros, hacer modificaciones o crear nuevos proyectos basados en el. Por ejemplo, puedes encontrar en GitHub diversos tutoriales de aprendizaje y el codigo fuente completo de frameworks para entrenar modelos GPT (como PyTorch). Cada dia, innumerables personas colaboran en todo el mundo para revisar y mejorar el codigo.

![](/zh-cn/stage-2/backend/git-workflow/images/image9.webp)

Muchas grandes empresas publican sus programas o tutoriales en codigo abierto en GitHub para obtener ventajas competitivas en la industria, lo que tambien puede verse como una forma de publicidad. En la comunidad de GitHub, el numero de "estrellas (stars)" que recibe un proyecto es el indicador principal de su valor; cuantas mas estrellas tenga un proyecto u organizacion, mayor sera su credibilidad e influencia.

![](/zh-cn/stage-2/backend/git-workflow/images/image10.png)

En nuestro curso, los recursos de apoyo y las tareas tambien se subiran a un repositorio de GitHub dedicado. A traves del proceso de subir tareas, te familiarizaras gradualmente y dominaras el uso de GitHub, sentando una base solida para el control de versiones en el desarrollo futuro de aplicaciones.

## Registrar una cuenta de GitHub

1. Visita el [sitio oficial de GitHub](https://github.com/) y haz clic en "Sign up" en la esquina superior derecha.
   ![](/zh-cn/stage-2/backend/git-workflow/images/image11.webp)
2. Ingresa tu direccion de correo electronico (se recomienda usar un correo de uso frecuente, ya que la verificacion y las notificaciones se enviaran alli), establece una contrasena (debe incluir letras, numeros y caracteres especiales).
3. Completa la verificacion humana, verifica tu correo segun las instrucciones y tu cuenta estara creada.

## Crear tu primer repositorio en GitHub

A continuacion, crearemos la primera carpeta de almacenamiento, tambien conocida como repositorio o "repo".

![](/zh-cn/stage-2/backend/git-workflow/images/image12.png)![](/zh-cn/stage-2/backend/git-workflow/images/image13.png)

![](/zh-cn/stage-2/backend/git-workflow/images/image14.png)

1. Repository name: El nombre del repositorio que se mostrara a otros.
2. Description: Una descripcion detallada del repositorio.
3. Choose visibility: Para repositorios personales, si se establece como private, solo tu y las personas especialmente invitadas pueden verlo. Si se establece como public, todos pueden verlo.
   Para repositorios dentro de una organizacion, si es Private, solo los miembros de la organizacion pueden verlo.
   Si es Public, personas fuera de la organizacion tambien pueden verlo.
4. README: La convencion comun es que cada repositorio debe tener un archivo README. Puedes considerarlo como la introduccion completa del repositorio, que incluye instrucciones de uso, lista de archivos y metodos de operacion.
5. Add .gitignore and license:
   1. El archivo .gitignore le dice a Git que ignore ciertas carpetas o archivos al subir a GitHub, por lo que no seran rastreados ni agregados al area de preparacion. Esto es util para archivos de prueba temporales, paquetes de dependencias o archivos grandes. Una vez especificados, estos archivos ya no seran rastreados.
   2. La licencia se refiere al tipo de licencia de codigo abierto que eliges. Diferentes licencias estipulan detalladamente si otros pueden usar tu codigo con fines comerciales, e incluyen otras clausulas y condiciones.

Se recomienda marcar "Add README", establecer la visibilidad del repositorio como "Private" y completar el nombre y la descripcion del repositorio segun tus preferencias, luego haz clic en "Create repository" para completar la creacion de tu primer repositorio remoto.

![](/zh-cn/stage-2/backend/git-workflow/images/image15.png)

Despues, tendras un repositorio limpio sin archivos adicionales. A continuacion puedes comenzar a subir archivos.

![](/zh-cn/stage-2/backend/git-workflow/images/image16.png)

El comando para obtener el repositorio es `git clone`, pero necesita la direccion del repositorio. Puedes encontrar la direccion del repositorio haciendo clic en el boton verde "Code", donde veras las opciones HTTPS y SSH. Generalmente, puedes usar cualquiera de estos dos metodos para descargar el repositorio a tu maquina local (solo asi podras modificar y subir archivos).

![](/zh-cn/stage-2/backend/git-workflow/images/image17.png)

En general, los repositorios clonados a traves de HTTP son adecuados para descargas temporales y pruebas de repositorios de otros, pero no se recomiendan para tu propio desarrollo. Para una mejor experiencia de aprendizaje, primero debes configurar la autenticacion SSH.

## Vincular SSH local

En GitHub, la "vinculacion del protocolo SSH" significa esencialmente asociar la clave publica SSH de tu dispositivo local con tu cuenta de GitHub, permitiendo a GitHub identificar tu dispositivo a traves del protocolo SSH. Esto te permite operar repositorios remotos de forma segura sin contrasena (como clonar, hacer push o pull de codigo).

En terminos simples: es como darle a tu dispositivo una "tarjeta de acceso exclusiva de GitHub". Una vez vinculada, cuando tu dispositivo accede a los repositorios de GitHub a traves del protocolo SSH, GitHub verifica esta "tarjeta de acceso" (tu clave publica SSH). Una vez que confirma que es tu dispositivo autorizado, puedes operar directamente, sin necesidad de ingresar tu nombre de usuario y contrasena cada vez.

> 💡 Que es SSH

### Por que se necesita la vinculacion del protocolo SSH?

GitHub soporta dos protocolos principales de operaciones de repositorios: protocolo HTTPS y protocolo SSH:

- Protocolo HTTPS: Cada operacion (como push) requiere ingresar el nombre de usuario y contrasena de GitHub (o un token de acceso personal PAT). El proceso de verificacion es tedioso y existe riesgo de filtracion de contrasenas.
- Protocolo SSH: La autenticacion se completa a traves de "pares de claves", por lo que no es necesario ingresar la contrasena repetidamente, y la transmision cifrada es mas segura.

La "vinculacion del protocolo SSH" es un paso previo para habilitar la autenticacion SSH de GitHub. Solo despues de "vincular" la clave publica SSH local a tu cuenta de GitHub, este podra identificar tu dispositivo y permitir operaciones SSH en los repositorios.

### La logica central de la "vinculacion": el rol del par de claves SSH

La autenticacion SSH depende de pares de claves (clave publica + clave privada), que son archivos de cifrado coincidentes. Despues de generarlos, debes proporcionar la "clave publica" a GitHub (la "vinculacion"), mientras que la "clave privada" permanece en tu dispositivo local:

1. Clave privada: Almacenada en un directorio especificado de tu dispositivo local (como la computadora), generalmente en ~/.ssh/, actua como "tu llave exclusiva" y nunca debe compartirse con nadie.
2. Clave publica: Es un "candado" que se puede compartir publicamente; debes copiarla en la "lista de claves SSH" de tu cuenta de GitHub (la operacion de "vinculacion").

Cuando operas un repositorio de GitHub a traves de SSH (por ejemplo, git push git@github.com:xxx/xxx.git):

- Tu dispositivo local usa la clave privada para cifrar la "solicitud de operacion" y la envia a GitHub;
- Despues de recibir la solicitud, GitHub intenta descifrarla usando la clave publica que vinculaste anteriormente;
- Si el descifrado es exitoso, tu dispositivo es confirmado como autorizado y la operacion es permitida; de lo contrario, el acceso es denegado.

### Pasos especificos de la "vinculacion" (flujo central)

Una vez que comprendas los principios, la operacion practica es simple: el nucleo es "generar el par de claves -> subir la clave publica a GitHub":

1. Generar el par de claves SSH localmente
   1. Usar Trae para obtener la clave publica (recomendado)
      Prompt: `Help me create the SSH key needed for GitHub login. My email is your_email@gmail.com , Please return the public key for me to copy`

   ![](/zh-cn/stage-2/backend/git-workflow/images/image18.webp)

   Despues de ingresar el prompt, tambien necesitas presionar Enter en la terminal izquierda; de lo contrario, el comando seguira esperando sin ejecutarse. Dado que Trae no puede ejecutar ninguna evaluacion condicional por ti, simplemente presionamos Enter continuamente.

   Al final, veras que Trae en el lado derecho devuelve la clave publica que leyo. Solo necesitas copiarla y prepararte para pegarla en el siguiente paso.

   ![](/zh-cn/stage-2/backend/git-workflow/images/image19.webp) 2. Obtener la clave publica manualmente
   Abre tu terminal local (en Windows usa Git Bash o PowerShell; en macOS/Linux usa la terminal) e ingresa el siguiente comando (reemplaza your_email@example.com con el correo electronico que usaste para registrar tu cuenta de GitHub):

   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```

   1. Presiona Enter para aceptar los valores predeterminados (ruta de archivo predeterminada, sin contrasena, o establece una contrasena segun sea necesario). Esto generara dos archivos en el directorio ~/.ssh/:
      - id_ed25519: Clave privada (guardada localmente, **nunca compartir**);
      - id_ed25519.pub: Clave publica (necesita subirse a GitHub).

2. "Vincular" la clave publica a tu cuenta de GitHub

Este es el paso central de vinculacion: agregar la clave publica local a la "lista de claves SSH" de tu cuenta de GitHub:

1. Copiar el contenido de la clave publica:
   1. Trae:
   2. Windows: Abre C:\Users\<your>\.ssh\id_ed25519.pub con el Bloc de notas y copia todo su contenido;
   3. macOS/Linux: Ejecuta cat ~/.ssh/id_ed25519.pub en la terminal y copia toda la salida (desde el SSH-ed25519 inicial hasta el correo electronico al final).
2. Iniciar sesion en GitHub e ir a la pagina de "Gestion de claves SSH":
   1. Haz clic en el avatar de la esquina superior derecha -> Settings -> menu izquierdo SSH and GPG keys -> haz clic en New SSH key.
      ![](/zh-cn/stage-2/backend/git-workflow/images/image20.png)![](/zh-cn/stage-2/backend/git-workflow/images/image21.png)
   2. Ingresa cualquier titulo (por ejemplo, your local computer's SSH) y luego pega la clave publica SSH que acabas de obtener.

![](/zh-cn/stage-2/backend/git-workflow/images/image22.png)

![](/zh-cn/stage-2/backend/git-workflow/images/image23.png)

3. Verificar que la vinculacion fue exitosa

Escribe el siguiente comando en la terminal (**Trae tambien puede hacer esto**) para probar si GitHub puede identificar tu dispositivo:

```bash
ssh -T git@github.com
```

- Si ves algo como Hi [your GitHub username]! You've successfully authenticated..., significa que has vinculado la clave exitosamente;
- Si encuentras errores, generalmente se debe a que la clave publica no se copio completamente, los permisos de la clave privada son demasiado abiertos (tu directorio ~/.ssh/ local solo debe ser accesible para lectura/escritura por ti), etc. Verifica estos problemas segun sea necesario.

### Notas importantes

Si tienes multiples dispositivos (como una laptop y una computadora de escritorio), necesitas generar un par de claves SSH independiente para cada dispositivo y vincular cada clave publica a la misma cuenta de GitHub; cada dispositivo tiene su propia "tarjeta de acceso".

Nunca compartas tu clave privada (no la subas a GitHub ni la compartas con otros), de lo contrario alguien podria suplantar tu identidad para operar tus repositorios. Si la clave privada se filtra, elimina inmediatamente la clave publica correspondiente de GitHub y genera un nuevo par de claves.

Despues de vincular SSH, usa la direccion del repositorio en formato SSH (por ejemplo, git@github.com:username/repository.git) para las operaciones, en lugar del formato HTTPS (por ejemplo, https://github.com/username/repository.git). Si previamente clonaste el repositorio usando HTTPS, puedes cambiar el protocolo con git remote set-url origin `<new>`.

# Usando Trae para operaciones de GitHub

Ya hemos explicado que es Git, que es GitHub, que es SSH y como configurarlo. Ahora puedes usar libremente Trae para ejecutar operaciones Git. Primero, aprendamos como clonar un repositorio remoto a tu maquina local.

## Git clone: Descargar un repositorio existente

Puedes decirle directamente la direccion del repositorio que deseas clonar.

![](/zh-cn/stage-2/backend/git-workflow/images/image24.webp)

## Git pull: Obtener actualizaciones del repositorio remoto

Antes de cada actualizacion del repositorio, dado que puede ser mantenido por multiples personas, necesitas primero extraer los cambios mas recientes. Despues, puedes modificar y hacer push de los archivos.

**Recuerda incluir el nombre de la carpeta y su ruta relativa o absoluta para evitar hacer push al repositorio incorrecto.**

prompt: `Help me pull this repository AIID-TEST in ./AIID-TEST.`

## Git commit y Git push: Preparar actualizaciones y hacer push a GitHub

Cuando todo este listo, puedes intentar modificar archivos locales, agregar o eliminar elementos en la carpeta. Luego, deja que Trae detecte los cambios y te ayude a hacer push a GitHub.

prompt: `I finished. Commit and push to the repository AIID-TEST in ./AIID-TEST.`

![](/zh-cn/stage-2/backend/git-workflow/images/image25.webp)

Push exitoso. Ahora puedes ver el contenido actualizado en GitHub.

# Referencias

- Pro Git book https://git-scm.com/book/en/v2
- GitHub Docs https://docs.github.com/en
