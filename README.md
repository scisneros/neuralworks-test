# neuralworks-test

Decisions:
- Timer is stored in seconds, then converted to clock format before display. This is done to avoid having to deal with synchronized separate counters for (hours,) minutes and seconds. If this is going to be online in the future, it's better to keep raw data simple. It does mean that conversion is done every second instead of every minute/hour, but that's hardly a problem for this scale.