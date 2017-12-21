### Central timer depot.

```
state.game.timers = {
	uid: {
		owner: playerID,
		tags: [
			'buzzer',
			'etc'
		],
    phaseLock: 'buzzIn',
		callback: function(){},
		ticks: numberOfSecondsUntilExecution
	},
	// repeat
}
```

* every player has a local interval every 1 second
* at each 'tick' they look for any timers with their player ID and run:
```
timer.ticks--
if(timer.ticks <=0){
    callback.call();
}
```
on any they own. 

There is also a 'phaseLock' property.  If this is set that locks the timer into the phase named in the prop val.  if the current phase is not that phase the timer is deleted during the timer check interval if the owner has your player ID.

a player should neither set nor alter a timer they do not own.
