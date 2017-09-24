/*
 * TODO: Add copyright
 *       Add unit tests
 *       Stop chimes on stop()
 *       Documentation
 *       Lint
 */
function create_clock(opts) {
  function validate_2digit_int(name, values, defaults) {
    var value = values[name];
    var defaultValue = defaults[name];
    var asInt = parseInt(values[name], 10);
    if (value == "" || value === undefined) {
      values[name] = 0;
    } else if (value != asInt) {
      console.log(`${name} value was not integer ("${value}"), using default: ${defaultValue}`);
      values[name] = defaultValue;
    } else if (asInt < 0 || asInt > 99) {
      console.log(`${name} value was out of range (${value}), using default: ${defaultValue}`);
      values[name] = defaultValue;
    } else if (value !== asInt) {
      values[name] = asInt;
    }
  }

  var defaults = {
    round: 1,
    rounds: 0,
    duration_mins: 13,
    duration_secs: 0,
    warning_mins: 0,
    warning_secs: 30,
  }

  if (opts === undefined) {
    opts = {};
  }

  validate_2digit_int("round", opts, defaults);
  validate_2digit_int("rounds", opts, defaults);
  validate_2digit_int("duration_mins", opts, defaults);
  validate_2digit_int("duration_secs", opts, defaults);
  validate_2digit_int("warning_mins", opts, defaults);
  validate_2digit_int("warning_secs", opts, defaults);

  function to2Digits(number) {
    return ("0" + number).slice(-2)
  }

  var round = $(document.createElement("div"))
    .attr("class", "clock-round");

  var time = $(document.createElement("div"))
        .attr("class", "clock-time")
        .addClass("paused")
        .append(document.createTextNode("00 : 00"));

  var top = $(document.createElement("div"))
    .append(round)
    .append(time);

  var clock = {
    round: opts.round,
    rounds: opts.rounds,
    duration: opts.duration_mins * 60 + opts.duration_secs,
    warning: opts.warning_mins * 60 + opts.warning_secs,

    dom: top,

    chimeSound: new buzz.sound("chime.mp3"),

    updateTimeDisplay: function() {
      var now = clock.time + 29;
      var mins = to2Digits(Math.floor(now / 60));
      var secs = to2Digits(Math.floor(now % 60 / 30) * 30);
      time.text(`${mins} : ${secs}`);
    },

    updateRoundDisplay: function() {
      var ofText;
      if (clock.rounds == 0) {
        ofText = ""
      } else {
        ofText = ` of ${clock.rounds}`;
      }
      round.text(`Round ${clock.round}${ofText}`);
    },

    reset: function() {
      clock.time = clock.duration;
      clock.updateTimeDisplay();
      clock.updateRoundDisplay();
    },

    next: function() {
      if (clock.round != clock.rounds) {
        clock.round += 1;
        clock.reset();
      } else {
        clock.flash();
        clock.stop();
        clock.time = 0;
        clock.updateTimeDisplay();
      }
    },

    tick: function(delta) {
      if (typeof delta == 'undefined') {
        delta = -1;
      }
      clock.time += delta;
      clock.updateTimeDisplay();
      if (clock.time <= 0) {
        clock.chime(3);
        clock.next();
      } else if (clock.time == clock.warning) {
        clock.chime(1);
      }
    },

    start: function() {
      if (clock.time > 0) {
        clock.ticker = setInterval(clock.tick, 1000);
        time.removeClass("paused");
      }
      clock.flash();
    },

    stop: function() {
      clearInterval(clock.ticker);
      clock.ticker = undefined;
      time.addClass("paused");
    },

    flash: function(duration) {
      duration = duration || 350;
      time.css("visibility", "hidden");
      setTimeout(function() {
        time.css("visibility", "visible");
      }, duration);
    },

    chime: function(count) {
      clock.chimeSound
        .play()
        .loop()
        .bind("playing", function(e) {
          if (count-- == 0) {
            clock.chimeSound.stop();
          } else {
            clock.flash(clock.chimeSound.getDuration() * 650);
          }
        });
    },

    keydownHandler: function(evt) {
      if (evt.which == 32) {
        if (clock.ticker === undefined) {
          if (clock.time == 0) {
            clock.next();
          }
          clock.start();
        } else {
          clock.stop();
        }
      } else if (evt.which == 78) {
        clock.next();
      } else if (evt.which == 219) {
        clock.tick(-60);
      } else if (evt.which == 221) {
        clock.tick(60);
      }
    },
  }

  if (clock.warning >= clock.duration) {
    console.log("warning time greater than or equal to duration: ignoring");
    clock.warning = undefined;
  }

  clock.reset();

  return clock;
}
