# bridge-clock

A clock/timer for duplicate bridge clubs

This is a minimal, fully self-contained, pure HTML5/Javascript bridge clock intended for use in bridge clubs, e.g. via a chromecast dongle attached to a TV in the club.

# Showing the clock on a TV using chromecast

## 1. Open the bridge clock page in Chrome.

Note you must use Chrome and not another browser such as Microsoft Edge, Firefox, or Safari. You can probably find extensions for those browsers that support chromecast however that is outside the scope of these instructions.

## 2. Adjust the clock settings if required.

E.g. click in the text boxes and edit the numbers to change the duration of the rounds or set the number of rounds to be played.

## 3. Turn on the TV to display the clock on.
This TV must have a chromecast dongle attached; see [Google's chromecast support page](https://support.google.com/chromecast/chromecast/) for details on installing and configuring it.

## 4. Cast the page to the chromecast device attached to the TV.

Press the cast button at the top-right of the browser window or select the "Cast..." option from the menu. See [Google's chrome tab cast support page](https://support.google.com/chromecast/answer/3228332) for more details.

## 5. Press space to start the clock running.

Note that if you have adjusted the clock settings you will need to click the mouse button outside of the text box that is being edited first so the space bar does not get captured by that.

## 6. Leave the clock running or control it as may be required.

You can minimise the browser window or switch to another tab without interfering with the clock display on the TV. If you wish to pause the clock you can do so by pressing space (after switching to the clock tab if required). Note that the time is greyed out while the clock is paused. Pressing space again will unpause it.

Further controls are detailed on the clock's [initial settings screen](https://duaneg.github.io/bridge-clock/).

# TODO
 * Unit tests!
 * Allowing space to start the clock when editting a numeric text field.
 * Integrate a cast button directly into the page via the Google Cast SDK 3.
