# How to Build a Local PWA App: Turn a Website into a "Real App"

# 1 What PWA and PWA Development Are

In this tutorial, we will complete a full closed loop: **from an ordinary web project to a "real app" that can be installed on a desktop and a phone home screen and still works when offline.** You will personally turn a React app into a PWA, deploy it online, and install it on your phone for testing.

What we are going to build is a **Tomato Farm** app - a PWA that perfectly combines the Pomodoro technique with a farming game. You earn points through 25 minutes of focused work, then use those points to buy seeds and plant crops. As your level increases, you unlock more farmland and better seeds. Most importantly, it keeps working even without internet, and all data is stored locally.

For this tutorial, you should at least have:

- A computer (Windows or Mac)
- A Node.js environment (version 18.0 or above)
- Your AI coding assistant (Cursor / Trae / Claude Code, etc.)
- A phone (for testing mobile installation)

## 1.1 Definition of PWA

**PWA (Progressive Web App)** is a special kind of website. Through **Service Worker** technology, it gains the ability to "cache and take over itself."

### Why ordinary websites cannot work offline, but PWAs can

An ordinary website needs to download HTML, CSS, and JS files from the server every time it opens, so if the network is down, it simply cannot load. A PWA, on the other hand, uses a **Service Worker** (a JS script running in the browser background) to cache these files locally on the first visit. After that, even if the network is disconnected, the Service Worker can read files directly from local cache and display the page normally.

**A simple analogy**: an ordinary website is like borrowing a book from a library every time (you must have internet), while a PWA is like buying the book and putting it on your own bookshelf (after the first download, you can still read it offline).

### PWA vs Ordinary Website vs Native App

| Feature | Ordinary Website | PWA | Native App |
|------|---------|-----|---------|
| **Installation** | Not needed | Optional (add to home screen) | Must download from app store |
| **Offline use** | ❌ No | ✅ Yes (after caching) | ✅ Yes |
| **Update method** | Auto refresh | Auto / background update | Manual user update |
| **Size** | None | A few hundred KB to a few MB | Tens of MB or more |
| **Development cost** | Low | Low (one codebase) | High (separate iOS / Android) |

**One-sentence summary**: a PWA is "a webpage that can store its own files" - it has the lightness of a website (no installation required, auto-updating) and the experience of a native app (offline support, installable to desktop/home screen).

<!-- ![](../../../../zh-cn/stage-3/cross-platform/3.8-pwa-local-app/images/image1.png) -->

## 1.2 Why Choose PWA?

In the Vibe Coding era, PWA is one of the most cost-effective "cross-platform solutions":

| Comparison Dimension | Native App | PWA |
|---------|---------|-----|
| Development cost | Must develop iOS / Android / desktop separately | One codebase for all platforms |
| Installation | Must go to app store | Install directly in browser, instant |
| Update method | Users must update manually | Auto updates, invisible to user |
| Package size | Often tens of MB | Usually only a few hundred KB |
| Offline support | Built in naturally | Supported through Service Worker |
| Best scenarios | Deep hardware access needed (AR / Bluetooth, etc.) | Content display, tools, lightweight apps |

**One-sentence summary**: if your app does not need AR through camera or Bluetooth hardware access, PWA is almost the easiest choice.

## 1.5 Tutorial Roadmap

To make the learning process less boring, this tutorial revolves around a fun and practical case - **Tomato Farm**. It is a Pomodoro farming game that combines focused work with gamified rewards. Together with the Vibe Coding mode of AI coding assistants, we will break the process from zero to phone installation into a reusable route:

1. **Build understanding and environment**: understand what PWA is, install Node.js and an AI coding assistant, and make sure the toolchain is smooth.
2. **Build the project skeleton**: create a React + TypeScript project that can run locally.
3. **AI iterative development**: through conversation with AI, build Pomodoro countdown, farming system, level system, SVG crop rendering, and more.
4. **PWA configuration and offline testing**: add Service Worker and Manifest, then verify offline support.
5. **Deployment and phone installation**: deploy to Vercel to get an HTTPS URL, then install and use it on a phone.

This section only gives the big picture, without expanding the exact commands. For now, just remember the main line: **Environment setup -> Skeleton building -> AI description and generation -> PWA configuration -> Deployment delivery**. In the next chapters, we will walk through each step with you.

# 2 Development Environment Setup

## 2.1 Tools Used in This Tutorial

During the whole development process we use three tools together, and they take the roles of "design," "construction," and "acceptance."

- **AI coding assistant (Cursor / Trae / Claude Code)**: this is your **AI coding partner**. In Vibe Coding mode, we no longer need to write code line by line. Instead, we mainly tell AI in natural language what functionality we want, and it handles code generation and modification.
- **Node.js + Vite**: these are the **project build factory**. Node.js provides the JavaScript runtime, and Vite is a next-generation frontend build tool with extremely fast speed, especially suitable for building PWAs.
- **A phone**: this acts as the **test device** to verify the running result. You can directly access the deployed PWA in the browser on your phone and test the real installation and offline functionality.

## 2.2 Install Node.js

Node.js is the basic environment for PWA development. Visit the official website [https://nodejs.org](https://nodejs.org) and download the **LTS (Long Term Support)** version (this tutorial is based on Node.js 18.x or above).

After download, install it like ordinary software by double-clicking the installer and keeping default options.

After installation, open the terminal (CMD / PowerShell on Windows, Terminal on Mac) and run:

```bash
node --version
npm --version
```

If you see version outputs such as `v18.17.0` and `9.6.7`, it means installation is successful.

<!-- 0 -->

## 2.3 Install the AI Coding Assistant

The AI coding assistant is the main battlefield of **Vibe Coding**. You can simply understand it as an **"editor with a super AI built in."**

**Recommended choices:**

- **Trae**: visit [https://www.trae.cn](https://www.trae.cn) and download the matching version for your OS
- **Cursor**: visit [https://cursor.sh](https://cursor.sh) and install it
- **Claude Code**: if you are already using Claude, you can use Claude Code directly

The installation process is very simple, just like installing normal software. After preparing this tool, in later practice we no longer need to stare at boring code windows. Instead, we will open the project here and use natural language in the chat box to ask AI to write code and fix bugs.

<!-- 0 -->

## 2.4 Create a New Project

Open your AI coding assistant and enter the following Prompt in the chat box:

```text
Please help me create a React project named tomato-farm-pwa for building a Tomato Farm app.
It needs to support TypeScript, and also include PWA functionality (the kind that can be installed to a phone home screen).
```

AI will automatically perform the following steps:

**Step 1: Create the project**

```bash
npm create vite@latest tomato-farm-pwa -- --template react-ts
```

**Step 2: Enter the project and install dependencies**

```bash
cd tomato-farm-pwa
npm install
```

**Step 3: Install the PWA plugin**

```bash
npm install vite-plugin-pwa -D
```

After AI finishes, your project structure will roughly look like this:

```text
tomato-farm-pwa/
├── public/              # Static assets (icons, SVG materials go here)
├── src/
│   ├── App.tsx          # Main component
│   ├── main.tsx         # Entry file
│   └── App.css          # Styles
├── index.html           # HTML entry
├── vite.config.ts       # Vite config (PWA config goes here)
├── package.json
└── tsconfig.json
```

## 2.5 Understand the Project Structure

After the project is created, we need to understand the role of several key files:

| File / Directory | Purpose |
|----------|---------|
| `src/App.tsx` | Main application component, where the core page logic is written |
| `src/main.tsx` | Application entry file, responsible for mounting the React app |
| `vite.config.ts` | Vite configuration file, where the core PWA config is written |
| `public/` | Static asset directory, where PWA icons and SVG materials go |
| `index.html` | HTML entry file, usually does not need modification |

As beginners, we mainly need to care about three parts:

- `App.tsx`: controls program behavior and decides "what appears on screen"
- `vite.config.ts`: configures PWA behavior and decides "how the app is installed and cached"
- `public/`: stores the app icons and assets

## 2.6 Prepare App Icons

PWA needs icons before it can be installed. At minimum, we need two PNG images in **192x192** and **512x512** sizes.

You can ask AI to generate them:

```text
Please help me generate two app icons with sizes 192x192 and 512x512.
Use a green gradient background and draw a red tomato in the middle. Save them in the public folder.
```

Or you can also create your own icons with any design tool (Figma, Canva) and put them into the `public/` directory.

<!-- 0 -->

## 2.7 Configure `vite-plugin-pwa`

This is the most critical step. Open `vite.config.ts` and ask AI to configure the PWA plugin:

```text
Please help me change vite.config.ts into a PWA configuration so the webpage can be installed to a phone home screen:
- The app name is "Tomato Farm", with a green theme
- Use icon-192.png and icon-512.png from the public directory as icons
- Enable automatic updates
- Cache all js, css, html, and image files so the app can work offline
```

AI will generate a configuration similar to this:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Tomato Farm',
        short_name: 'Tomato Farm',
        description: 'Focus, plant, and grow',
        theme_color: '#4CAF50',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      }
    })
  ]
})
```

**Key configuration explanation:**

* `registerType: 'autoUpdate'`: when you publish a new version, the app will update automatically the next time users open it, without manual operation.
* `display: 'standalone'`: after installation, it runs in its own window, without browser address bar, and feels like a native app.
* `workbox.globPatterns`: tells the Service Worker which file types should be cached and still accessible offline.

<!-- 0 -->

# 3 Build the Tomato Farm PWA

In the previous two chapters, we already understood what a PWA is and completed the environment setup. From this section onward, we stop talking only in theory and move into hands-on practice. We will use Vibe Coding mode to build a fun and practical app from scratch - **Tomato Farm**. It perfectly combines the Pomodoro technique with gamified incentives and covers the core elements of PWA development: **UI interaction (Pomodoro timer), data storage (points and crops), and offline capability (Service Worker caching).**

Now, let us send the first instruction to AI.

## 3.1 The First "Master Prompt": From Zero to One

In Vibe Coding mode, we do not need to follow the traditional approach of first creating layout files and then writing logic code. What we need to do is **describe the requirements clearly in one shot and let AI generate the first runnable version**.

Open the project directory we just created in your AI coding assistant, and enter the following Prompt:

```text
Please help me write the main page for the Tomato Farm app, with the following functions:

**Pomodoro Timer**
- A 25-minute countdown timer with start, pause, and reset
- Show remaining time and a progress bar
- Give the user 10 points after completing one focus session

**Farming System**
- 3 plots of farmland, but initially only the first one is available; the later ones are unlocked after leveling up
- A shop to buy seeds: carrot costs 5 points, tomato 10 points, corn 15 points
- After buying seeds and planting them, crops slowly grow, and when mature they can be harvested for points

**Level System**
- Level by total points: 0-100 points = Beginner Farmer, 100-300 = Skilled Farmer, above 300 = Farm Master
- Unlock new land and better seeds after leveling up

**UI Design**
- Top shows level, points, and upgrade progress bar
- Middle shows the Pomodoro countdown
- Below is the farmland grid
- Bottom has the shop button
- Use a green theme and make it look fresh and cute
- Must adapt to phone screens

**Data Saving**
- All data (points, level, farmland state) must be saved, and refreshing the page should not lose it
```

After sending it, you will see AI start reasoning and analyzing your project structure. A few seconds later, it will directly generate the complete code for `App.tsx`.

1. From its response, we can see its reasoning logic and interaction logic
2. We can directly see which code it changed
3. If we are not satisfied, we can roll back to the previous version

<!-- 0 -->

## 3.2 Run and Preview (Local Development Server)

Now AI has completed the first round of development, but remember: what we see in the coding assistant is still just code "blueprints," not a truly interactive app. We need to start a local development server so we can actually run the code and view the real effect.

Run this in the terminal of your AI coding assistant:

```bash
npm run dev
```

After a few seconds, the terminal will show output like this:

```text
  VITE v5.0.0  ready in 300 ms

  ->  Local:   http://localhost:5173/
  ->  Network: use --host to expose
  ->  press h + enter to show help
```

Open `http://localhost:5173/` in your browser, and you should see:

- level, points, and a progress bar at the top
- a Pomodoro countdown in the middle
- farmland area below
- a shop button at the bottom

Try clicking the "Start Focus" button and see if the countdown works properly. Click on a farmland tile and see if you can buy seeds and plant them. This is the first version of your PWA app.

<!-- 0 -->

## 3.3 Optimization Iteration (Add SVG Crops and Animation)

At this point, our app already has a basic shape: Pomodoro timer, farming system, and leveling system. But it may still look rough, with crops perhaps shown only as text or simple blocks. Next, we will add beautiful SVG crops and growth animation to make the Tomato Farm come alive.

**This is exactly where Vibe Coding becomes so attractive.** In traditional development, drawing SVG graphics and building complex growth animations can be a nightmare for beginners. You not only need to handle SVG path drawing, but also calculate animation curves. In Vibe Coding mode, you do not need to worry about those low-level details. You just tell AI like a director: "Give the crops nicer SVG graphics and make them grow with animation," and the complex code appears almost instantly.

**Step 1: Prepare SVG crop assets**

You can ask AI to draw SVG directly in code, or prepare SVG files and put them under `public/`. In this tutorial, we recommend letting AI generate SVG code directly because it is more flexible.

**Step 2: Send an iteration instruction**

Return to the AI coding assistant and enter the following Prompt:

```text
Please make the crops look better and add growth animation:

**Crop graphics**
- Carrot: orange body with green leaves
- Tomato: red round shape with little green leaves
- Corn: yellow corn cob with green outer leaves
Just use simple shapes

**Growth animation**
- When first planted, it starts as a small sprout and gradually grows to maturity
- Show 3 stages

**Harvest effect**
- When clicking a mature crop, play a simple harvest animation
- Show how many points were gained

**Overall polish**
- Farmland tiles should have borders and background color
- Crops should appear centered in the tile
- Overall style should feel a little cuter
```

AI will modify the code again and handle the SVG rendering and animation logic. After it finishes, refresh the browser, and you should see better crop graphics and smooth growth animations.

<!-- 0 -->

## 3.4 Add Sound Effects and Notifications (Optional)

If you want Tomato Farm to feel more immersive, you can also add sound effects and notifications. This also only needs a simple Prompt:

```text
Please add sound effects and notifications to Tomato Farm:

**Sound effects**
- Play a "ding" when focus starts
- Play a victory sound when focus is completed
- Also add matching sound effects for planting and harvesting

**Notifications**
- Show "Congratulations, you finished a focus session!" after a focus cycle ends
- Show "Congratulations, you leveled up to XX!" when leveling up
- Show "You unlocked a new farmland plot!" when new land is unlocked

You can implement this with simple audio files or the Web Audio API
```

AI will help you add sound effects and notifications, making the Tomato Farm more lively and enjoyable.

<!-- 0 -->

# 4 Experience the PWA Locally

## 4.1 Build and Preview

The PWA Service Worker only takes effect in production builds (it will not register in development mode). So we need to build first, then preview:

```text
Please help me run these commands:
1. npm run build (build production version)
2. npm run preview (start local preview server)
```

After build, Vite will generate all files in the `dist/` directory, including the auto-generated `sw.js` (Service Worker) and `manifest.webmanifest`.

Once the preview server starts, open the address shown in the terminal (usually `http://localhost:4173`).

## 4.2 Install the PWA on Desktop

After opening the preview URL, you will notice an **install icon** appears on the right side of the browser address bar (usually a small download arrow or "+" sign).

**Chrome / Edge installation steps:**

1. Click the install icon on the right side of the address bar
2. Click **Install** in the popup dialog
3. The PWA will open in a standalone window, and a shortcut will be created on your desktop / Start Menu / Dock

The installed PWA looks just like a native desktop app - no address bar, no tabs, with its own window and icon. Now you can open Tomato Farm anytime and begin your focus-and-farming journey.

<!-- 0 -->

**macOS Safari installation steps:**

1. Open the PWA URL in Safari
2. Click **File -> Add to Dock** from the menu bar
3. The PWA icon will appear in the Dock

## 4.3 Test Offline Capability

This is the coolest part of PWA. Let us verify whether offline mode really works:

1. Make sure the PWA has been opened in the browser at least once (so the Service Worker can cache resources)
2. **Disconnect the network** (turn off Wi-Fi or unplug the cable)
3. Refresh the page - you will find that **Tomato Farm still loads normally!**
4. Start a Pomodoro session - after it finishes you gain points, buy seeds, plant crops - and all the data is still saved normally in `localStorage`

You can also open Chrome DevTools (F12) -> Application -> Service Workers to inspect Service Worker status and cached resource lists.

<!-- 0 -->

## 4.4 Data Persistence and Sync Options

Now your Tomato Farm can already run offline, and all data is saved in the browser's `localStorage`. But there is one key problem: **if the user switches devices or clears browser data, all farm data will be lost**. For serious production apps, we need to think about data persistence and cross-device synchronization.

### 4.4.1 Limitations of Local Storage

The `localStorage` we are currently using has several obvious limitations:

| Limitation | Description |
|--------|------|
| **Device-bound** | Data is only stored in the current browser on the current device; switching devices means losing it |
| **Limited capacity** | Usually only 5-10MB of storage space |
| **Easy to lose** | Clearing browser data or uninstalling the PWA causes data loss |
| **Cannot sync** | Progress on phone cannot sync to desktop |

If your Tomato Farm is just a personal tool, this may not be a problem. But if you want users to invest long term and accumulate data, a more reliable solution is needed.

### 4.4.2 Option 1: Cloud Sync (Recommended)

The most reliable solution is synchronizing data to a cloud database. For PWAs, **Supabase** is an excellent choice - it provides a PostgreSQL database, real-time subscriptions, and authentication, and also offers a free tier.

**Implementation idea:**

1. **User login**: use email or social login to establish user identity
2. **Automatic data sync**: every operation automatically saves to the cloud
3. **Offline-first**: the app still works when offline, then syncs automatically when the network returns
4. **Cross-device sync**: progress on phone is available immediately on desktop

**Prompt example:**

```text
Please help me migrate Tomato Farm data storage from localStorage to Supabase cloud sync:

**Functional requirements**
- Add user login (email + password or Google login)
- Save user data (points, level, farmland state) to Supabase database
- Still work offline, and automatically sync when the network recovers
- Support multi-device sync, so crops planted on the phone can also be seen on desktop

**Tech stack**
- Use @supabase/supabase-js client
- Implement optimistic updates (update UI first, then sync to cloud)
- Add a simple sync status indicator
```

**Pros:**

- Data will not be lost; users only need to log in again when switching devices
- Free tier is enough for personal projects
- Supports real-time subscriptions, giving good multi-device sync experience

**Cons:**

- Requires user registration/login, adding usage friction
- Needs network connection to perform syncing

### 4.4.3 Option 2: Export / Import Backup

If you do not want to add a backend service, a simpler compromise is **manual backup and restore**.

**Implementation idea:**

1. **Export**: package farm data as a JSON file and let users download it
2. **Import**: users can select a previously exported JSON file to restore data
3. **Automatic reminder**: remind users to back up periodically

**Prompt example:**

```text
Please add data backup functionality to Tomato Farm:

**Export**
- Add an "Export Data" button on the settings page
- Package all data in localStorage into a JSON file
- Automatically download it to the user's device

**Import**
- Add an "Import Data" button that accepts a JSON file
- Validate file format before restoring
- Show a warning before import because it overwrites current data

**Automatic reminders**
- If the user has not backed up for over 7 days, show a friendly reminder
```

**Pros:**

- Simple to implement, no backend service required
- Users fully control their own data
- Can transfer across devices by sharing the exported file

**Cons:**

- Requires manual operation, so the experience is not smooth
- If the user forgets to back up, data can still be lost

### 4.4.4 Option 3: Browser Extension Sync (For Chrome Users)

If your PWA mainly targets Chrome users, you can consider **Chrome Storage Sync API**. This is a cross-device synced storage service provided by Chrome, where data automatically syncs with the user's Google account.

**Note:** this requires packaging the PWA as a Chrome extension as well, which is more suitable for developers with technical experience.

### 4.4.5 Recommended Choice Strategy

| Scenario | Recommended Solution |
|------|----------|
| Personal lightweight tool | `localStorage` only is enough |
| Want to avoid data loss, but do not want too much complexity | Export / import backup |
| Official product with better user experience | Supabase cloud sync |
| Mainly for Chrome users | Chrome Storage Sync |

**For an app like Tomato Farm, my suggestion is:**

1. **MVP stage**: start with `localStorage` to verify the product idea quickly
2. **Iteration stage**: add export / import backup so users have a data safety net
3. **Mature stage**: integrate Supabase to achieve real cloud synchronization

Remember: **progressive enhancement** is the core philosophy of PWA. First make the app run, then gradually add more advanced capabilities.

<!-- 0 -->

# 5 Deploy Online

PWA must run under HTTPS in order to work correctly. The good news is that mainstream deployment platforms now provide free HTTPS automatically. We will use **Vercel** as an example (you could also use Netlify or GitHub Pages).

## 5.1 Deploy to Vercel

**Step 1: Install the deployment tool**

```text
Please help me install Vercel's deployment tool
```

**Step 2: Deploy the project**

```text
Please help me deploy this project to Vercel. The project name is tomato-farm-pwa
```

AI will handle the deployment steps automatically. You only need to:
- choose your account
- confirm creating a new project
- keep the other options at default

After waiting a few dozen seconds, Vercel will automatically build and deploy your project. When done, you will get an HTTPS URL like `https://tomato-farm-pwa.vercel.app`.

<!-- 0 -->

**Step 3: Verify the PWA**

Open the deployed URL in your browser, and you should see:

1. an install icon appear on the right side of the address bar
2. in DevTools -> Application -> Manifest, your configured app info such as the name "Tomato Farm"
3. in the Service Workers tab, the Service Worker shown as activated

## 5.2 Deploy with GitHub Pages (Alternative)

If you prefer GitHub Pages, you need additional path configuration:

```text
Please help me modify the config so the project can be deployed to GitHub Pages.
My repository name is tomato-farm-pwa, so please adjust the path configuration accordingly.
```

Then push the build output to the `gh-pages` branch of your GitHub repository.

# 6 Install the PWA on a Phone

This is the most exciting part - turning your Tomato Farm webpage into an "app" on your phone.

## 6.1 Install on Android

1. Open your deployed Tomato Farm PWA URL in the **Chrome browser** on your phone
2. Chrome may automatically show an **"Add to Home screen"** prompt banner - just click it
3. If it does not show automatically, tap the **three-dot menu** in the top-right corner -> **Install app** or **Add to Home screen**
4. Confirm installation, and a Tomato Farm app icon will appear on your phone's home screen

Open it and you will notice it runs in full-screen mode, without the browser address bar or navigation buttons, looking almost exactly like a native app. Now you can start focusing and farming anytime.

<!-- 0 -->

## 6.2 Install on iPhone

On iOS, PWA can only be installed through the **Safari** browser (other browsers do not support installation):

1. Open your deployed Tomato Farm PWA URL in **Safari**
2. Tap the **Share** button at the bottom (square with an upward arrow)
3. In the menu, choose **Add to Home Screen**
4. Give the app a name and tap **Add**

Starting from iOS 26, all websites added to the home screen will open in standalone app mode by default, which is a major improvement.

<!-- 0 -->

> **Known limitations on iOS:**
> * Push notifications require iOS 16.4 or above, and the PWA must already be added to the home screen
> * Background Sync is not supported
> * Storage space is more limited than on Android

## 6.3 Audit Your PWA with Lighthouse

Google provides a tool called **Lighthouse**, which can score your PWA. Open Chrome DevTools (F12) -> Lighthouse -> check "Progressive Web App" -> click "Analyze page load."

A qualified Tomato Farm PWA should get a full score in the PWA category. If not, Lighthouse will tell you the exact reasons and suggest fixes.

<!-- 0 -->

# 7 Final Notes

Congratulations! You have successfully built a Pomodoro farming PWA that can be installed on both desktop and mobile. Let us review what we did:

1. Created a Tomato Farm web app with Vite + React
2. Added Service Worker and Manifest via `vite-plugin-pwa`
3. Deployed it to Vercel to get an HTTPS URL
4. Successfully installed it on both desktop and mobile, and tested offline capability

Now your Tomato Farm PWA can already achieve:
* **Focus farming**: help users stay focused through the Pomodoro mechanism
* **Gamified rewards**: use planting, leveling, and unlocking to motivate repeated use
* **Offline usability**: even with no network, users can still focus, plant, and manage their farm
* **Cross-platform installation**: develop once and install on multiple kinds of devices

The charm of PWA is its "progressiveness" - you do not need to make it perfect at the very beginning. First make the website installable and available offline, then gradually add advanced capabilities such as push notifications and background sync.

**Advanced directions:**

* **Push notifications**: use Push API + Notification API to remind users when a Pomodoro finishes, or when crops are ready to harvest
* **Background sync**: use Background Sync API to sync farm data to the cloud after the network returns
* **Smarter caching strategies**: use different Workbox strategies such as CacheFirst, NetworkFirst, and StaleWhileRevalidate for different kinds of assets
* **Publish to app stores**: use [PWA Builder](https://www.pwabuilder.com/) to package the Tomato Farm PWA into an Android APK or Microsoft Store app
* **Social features**: add a friend system so users can visit each other's farms and exchange crops

***One codebase, all platforms - this is the power of PWA. Focus, plant, and grow!***

# References

* [Vite PWA Official Docs](https://vite-pwa-org.netlify.app/guide/)
* [Google PWA Development Guide](https://web.dev/progressive-web-apps/)
* [MDN Web App Manifest Docs](https://developer.mozilla.org/en-US/docs/Web/Manifest)
* [Workbox Caching Strategies Overview](https://developer.chrome.com/docs/workbox/caching-strategies-overview/)
* [PWA Builder - Publish PWA to App Stores](https://www.pwabuilder.com/)
