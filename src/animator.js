'use strict';

import _ from 'lodash';
import Animation from './animation.js';

/** Animator class. */
export default class TAnimator {
  constructor(params = {}, obj = undefined) {
    this.params = _.extend({
      animations: [],
      run: false,
      loop: false,
      autoAdd: true
    }, params);

    if (obj !== undefined) {this.params.obj = obj;}

    this.params.animations = _.map(this.params.animations, anim => {
      if (anim instanceof Animation || anim.params) {return anim;}
      return new Animation(this.params.obj, anim);
    });

    this.queue = [];
    this.run = this.params.run;
  }

  /** main update method */
  update(dt) {
    if (!this.run || this.params.animations.length === 0) {return;}

    let {stop: stop, dt: ddt} = this.queue[0].update(dt);

    if (stop) {
      this.__shift();
      this.update(ddt);
    }
    if (this.params.onUpdate && this.params.onUpdate instanceof Function) {this.params.onUpdate(this);}
  }

  __shift() {
    const a = this.queue.shift();

    a.stop();
    if (this.params.loop) {this.queue.push(a);}
    if (this.queue.length > 0) {this.queue[0].start();} else {
      this.run = false;
      if (this.params.onComplete && this.params.onComplete instanceof Function) {this.params.onComplete(this);}
    }
  }

  /** start animations */
  start(onComplete) {
    if (this.params.animations.length === 0) {return this;}
    if (onComplete) {this.params.onComplete = onComplete;}
    this.queue = _.map(this.params.animations, a => a);
    this.run = true;
    this.queue[0].start();
    return this;
  }

  /** stop animations */
  stop(applyTo = true) {
    this.run = false;
    this.params.loop = false;
    if (applyTo) {_.forEach(this.params.animations, a => a.stop(applyTo));}
    return this;
  }
}

