# neuralworks-test

Decisions:
- Timer is stored in seconds, then converted to clock format before display. This is done to avoid having to deal with synchronized separate counters for (hours,) minutes and seconds. If this is going to be online in the future, it's better to keep raw data simple. It does mean that conversion is done every second instead of every minute/hour, but that's hardly a problem for this scale.

- Stages settings are implemented in a scalable way. Components don't care about the number of stages or their names. Even though it is unlikely that this list will change, as they are standardized by the Pomodoro Technique, this approach avoids repeating code for states, setters, change handlers, etc., for each stage separately.

- Home page texts were generated using ChatGPT.

- Color scheme was thought based on NeuralWorks branding. A dominant white with strong pink-purple accents and pitch black text could be seen on their website and social media. The specific shade of pink was chosen directly from the styles on their blog, Plasticity. As this project is a productivity tool, I decided to keep the dominant white big negative space, clean and simple design, and avoid unnecessary images, textures, texts and colors on the UI. A slight purple gradient was added to the logo, resembling the neon-like textures and imagery on source material.

- Stages have different color schemes both for a functional quick recognition of the current stage, and to evoke the feeling of a different environment for each stage. Breaks are blue-green-ish cold colors, while the brand intense pink is used for the work stage (though color meanings are highly subjective and overinterpreted).

- Logo was vectorized by hand from a [raster image](https://neuralworks.cl/wp-content/uploads/2021/07/logo-2-1024x176.png) found on NeuralWorks website. Logotype font was identified to be Kamerik 105 Bold using [MyFont's WhatTheFont](https://www.myfonts.com/pages/whatthefont). However, as the font is not free, I used a similar free font, [Florencesans Bold](https://www.dafont.com/es/florencesans.font), to modify the logotype to "NeuralClocks", then made some manual tweaks to better match the original.

Possible improvements:
- Store stages settings in local session, so that they are not lost on page reload.