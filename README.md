# neuralworks-test

This is a work application challenge for [NeuralWorks](https://neuralworks.cl/). The challenge was to build a Pomodoro timer, which would be the first step of a bigger internal app to manage employees time when working remotely. On this context, explanations about the project and decision-making are included in this README.
## Demo
A live demo of this repo is available at [neuralworks-test.vercel.app](https://neuralworks-test.vercel.app/)

## Installation
Clone the repository and install dependencies:
```bash
cd neuralworks-test
npm install
```
Run the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

## Description
### Pomodoro Timer
This project is supposed to be the beginning of a bigger app. Currently, its main and only feature is a Pomodoro timer.

This is a standard [Pomodoro Technique](https://en.wikipedia.org/wiki/Pomodoro_Technique) timer, with work sessions, aka *Pomodoros*, alternating with breaks. Every 4 Pomodoros, there is a longer break. By default, work sessions are 25 minutes long, short breaks are 5 minutes long, and long breaks are 15 minutes long. These settings can be changed in the settings menu at the top.

You can use the timer using the play/pause button at the bottom and move between stages with the buttons at the top.

## Structure
The project follows a standard Next.js project structure, with pages, components, styles and public folders. It uses the fairly new [App Router](https://nextjs.org/docs/app), which changes the directory structure a bit, but it is still very similar to the old Page Router. Basically, routing is done based on the directory structure, where every directory has a `page.tsx` file to be the rendered component for its corresponding route. Other files in the same directory are not rendered and can be used as modules or sub-components for the page component.

Structure is as follows:
- `app`: Contains the index route (`/`) on its `page.tsx`. It also defines the root `layout.tsx`, where the layout for navbar and page content is defined.
  - `pomodoro`: Contains the Pomodoro timer route (`/pomodoro`) on its `page.tsx`. It also contains the `timer.tsx` component, which is the main component for the timer, and the `progress.tsx` component, which is the progress bar for the timer. Other timer-related utility components are defined here.
- `components`: Contains the reusable or page-independent components, such as the navbar.
- `public`: Static files, such as the logos and alarm audio files.
- `utils`: Utility functions.

Styles are defined using [Tailwind CSS](https://tailwindcss.com/), which is a utility-first CSS framework. Following its philosophy, each component is styled inline, so no extra stylesheets are needed. There's only `app/globals.css`, where imports for Tailwind and a few global styles are defined, and `tailwind.config.js`, where the Tailwind theme is customized.

## Software design decisions
#### Framework: Next.js
I chose Next.js mainly because it is a framework I am familiar with, and it is very easy to set up a project with it. Also it is very easy to deploy a working demo on Vercel, which is useful for the context of this project. Initially I thought of using React, but it is [recommended by their own documentation](https://react.dev/learn/start-a-new-react-project) to use a framework for new projects, and considering that this project is supposed to be a part of a bigger app, it is a nice idea to start with a framework capable of easily scaling up and optimizing for production.

#### Styles: Tailwind CSS
I chose Tailwind CSS because it is a very quick to use and powerful CSS framework. I'm usually not fond of utility-first CSS, but given the prototype nature of this project and limited time, I preferred it over more semantic options. It is also very easy to integrate with Next.js, as it is [officially supported](https://tailwindcss.com/docs/guides/nextjs).

Class names used are not quite optimal and there is some verbosity at times, but it is a trade-off for the sake of speed and simplicity. A more robust design system could be abstracted without having to change framwork, but it was not worth it for this prototype.

#### State storage
Most of the Pomodoro states (time, stage, etc) are stored using a [React Context](https://react.dev/learn/passing-data-deeply-with-context). This is because there are multiple timer-related components which are affected by these states, and it is easier to have a single source of truth for them instead of passing props and handles. This context is implemented at the lowest possible level, so that only the components that need it are re-rendered when the state changes.

#### Stages
Stages are implemented in a scalable way, as a list of objects. This way, components don't care about the number of stages or their names. Even though it is unlikely that these stages will ever change, as they are standardized by the Pomodoro Technique, this approach avoids repeating code for states, setters, change handlers and checks for each stage separately.

#### Navigation
A Navbar was implemented to navigate between pages using the Next.js router. This was done considering this is a prototype for a bigger app, and it is likely that more pages will be added in the future. A generic home page was implemented as a placeholder, with texts generated using ChatGPT.

#### User interface
Design scheme was thought based on NeuralWorks branding. A largely dominant white with strong pink-purple accents and pitch black text could be seen on their website and social media [[Website]](https://neuralworks.cl/) [[Blog]](https://plasticity.neuralworks.cl/) [[Instagram]](https://www.instagram.com/neuralworks_ai/) [[Video]](https://www.youtube.com/watch?v=s_O6l1UKq2o).

As this project is an internal productivity tool, I decided to keep the dominant white big negative space through a clean, simple, minimalist design, and avoid unnecessary images, textures, texts and colors on the UI, even though textures are present on their branding.

Also considering the internal nature of this project, there's the assumption that the user is somewhat familiar with technology and the Pomodoro Technique, so there's no particular need for a tutorial or too many instructional texts, reinforcing the minimalist approach.

The specific shade for the main pink was chosen directly from the styles on their blog, [Plasticity](https://plasticity.neuralworks.cl/). A slight purple gradient was added to the logo, to subtly compensate for the minimalism and to resemble the neon-like textures and imagery on source material.

Stages have different color schemes both for a functional quick recognition of the current stage, and to evoke the feeling of a different environment for each stage. Breaks are blue-green-ish cold colors, while the brand intense pink is used for the work stage (though color meanings are highly subjective and overinterpreted, this adjusts to the western web standards). These other colors are from the Tailwind defaults.

Logo was vectorized by hand from a [raster image](https://neuralworks.cl/wp-content/uploads/2021/07/logo-2-1024x176.png) found on NeuralWorks website. Logotype font was identified to be Kamerik 105 Bold using [MyFont's WhatTheFont](https://www.myfonts.com/pages/whatthefont). However, as the font is not free, I used a similar free font, [Florencesans Bold](https://www.dafont.com/es/florencesans.font), to recreate the NeuralWorks type with the "Clocks" text, then made some manual tweaks to better match the original.

#### Inspiration
I based mainly on the [Pomofocus](https://pomofocus.io/) web app, which is a very clean implementation of the Pomodoro Technique. I also looked at [Tomato Timer](https://tomato-timer.com/), [Pomodor](https://pomodor.app/timer) and other similar apps, mostly to see the handling of stages progression.

## Possible improvements
- **Session storage**. Store stages settings in local session, so that they are not lost on page reload.

- **Backend**. This is just a demo of a part of the proposed project. Obviously, if this were to be extended, it would need a backend to store user data.

- **Customize alarm settings**. Currently, alarm is a fixed sound. Ideally user should be able to choose between different sounds and adjust volume.

- **Desktop notifications**. The alarm is only a sound and in-app visual cues. It would be nice to have a desktop notification as well, considering that the user most probably won't be looking at the app during sessions.

- **Automatic transitions**. Give the option to automatically start the next stage when the current one ends.

- **Skip current stage**. Manually finish a stage before timer ends. For example, if you are in a break and want to start working again, you should be able to skip the break and start the work stage. Currently you can change the stage as needed, but it can mess up the Pomodoro progression.

- **Settings in a modal menu**. Right now they are a list of inputs at the top and use space when opened, moving the whole content down. A modal menu would be more elegant and would allow to add more settings in the future without cluttering the UI.

## Ideas for future features
- **"Shame timer"**, which starts counting when a regular timer ends, until you start the next stage. This way the user can see how much they overextend on their work or break sessions, and hopefully encourage them to keep on track.

- **Gamification**. Maybe a score system, or something more like caretaking-oriented. For example, what [Forest](https://www.forestapp.cc/) does, where you grow a tree for each session, and if you leave the app before the session ends, the tree dies. This could be a nice way to emotionally motivate the user. Considering this is planned to be an online collaboration app, this pseudo-competitive approach may encourage using it.

- **Reports**. Some statistics on how much time you spend on each stage, how many sessions you complete, etc. [Pomofocus](https://pomofocus.io/) does this, and it's a nice way to keep track of your productivity.