# neuralworks-test

## Software design decisions
#### Framework: Next.js.
I chose Next.js mainly because it is a framework I am familiar with, and it is very easy to set up a project with it. Also it is very easy to deploy a working demo on Vercel, which is useful for the context of this project. Initially I thought of using React, but it is [recommended by their own documentation](https://react.dev/learn/start-a-new-react-project) to use a framework for new projects, and considering that this project is supposed to be a part of a bigger app, it is a nice idea to start with a framework capable of easily scaling up and optimizing for production.

#### Time storing
Timer is stored in seconds to avoid having to deal with synchronized separate counters for (hours,) minutes and seconds. It is much easier to use a single consistent number between components. Conversion to digital clock format is done only when displaying the time.

#### Stages
Stages are implemented in a scalable way, as a list of objects. This way, components don't care about the number of stages or their names. Even though it is unlikely that these stages will ever change, as they are standardized by the Pomodoro Technique, this approach avoids repeating code for states, setters, change handlers and checks for each stage separately.

#### Home page
A generic home page was implemented as a placeholder to convey the idea that this is part of a bigger project. Home page texts were generated using ChatGPT.

#### Visuals
Design scheme was thought based on NeuralWorks branding. A largely dominant white with strong pink-purple accents and pitch black text could be seen on their website and social media.

As this project is an internal productivity tool, I decided to keep the dominant white big negative space through a clean, simple, minimalist design, and avoid unnecessary images, textures, texts and colors on the UI.

The specific shade of pink was chosen directly from the styles on their blog, [Plasticity](https://plasticity.neuralworks.cl/). A slight purple gradient was added to the logo, to subtly compensate for the minimalism and to resemble the neon-like textures and imagery on source material.

Stages have different color schemes both for a functional quick recognition of the current stage, and to evoke the feeling of a different environment for each stage. Breaks are blue-green-ish cold colors, while the brand intense pink is used for the work stage (though color meanings are highly subjective and overinterpreted). These other colors are from the Tailwind defaults.

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