# neuralworks-test

Decisions:
- Timer is stored in seconds, then converted to clock format before display. This is done to avoid having to deal with synchronized separate counters for (hours,) minutes and seconds. If this is going to be online in the future, it's better to keep raw data simple. It does mean that conversion is done every second instead of every minute/hour, but that's hardly a problem for this scale.

- Stages settings are implemented in a scalable way. Components don't care about the number of stages or their names. Even though it is unlikely that this list will change, as they are standardized by the Pomodoro Technique, this approach avoids repeating code for states, setters, change handlers, etc., for each stage separately.

Possible improvements:
- Store stages settings in local session, so that they are not lost on page reload.