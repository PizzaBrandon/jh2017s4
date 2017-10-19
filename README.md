# Phone Display Prop

This is an MVP (and a bit fragile) prop written in React to simulate a text conversation between a visible character and one off-scene.

This prop uses 4 different keys on the keyboard to progress through the scene:

- `S` starts the scene and brings up the phone screen
- `Space` starts the next message
  - _Note:_ If a message is currently "typing" and you press space again, the program will lose track of itself and display incorrect output
- `C` invokes the car crash sound effect
- `R` resets the screen to black, ready to start again
