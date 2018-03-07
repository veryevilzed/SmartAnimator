'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);var _animation=require('./animation.js');var _animation2=_interopRequireDefault(_animation);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}/** Animator class. */var TAnimator=function(){function TAnimator(){var _this=this;var params=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};var obj=arguments.length>1&&arguments[1]!==undefined?arguments[1]:undefined;_classCallCheck(this,TAnimator);this.params=_lodash2.default.extend({animations:[],run:false,loop:false,autoAdd:true},params);if(obj!==undefined){this.params.obj=obj;}this.params.animations=_lodash2.default.map(this.params.animations,function(anim){if(anim instanceof _animation2.default||anim.params){return anim;}return new _animation2.default(_this.params.obj,anim);});this.queue=[];this.run=this.params.run;}/** main update method */_createClass(TAnimator,[{key:'update',value:function update(dt){if(!this.run||this.params.animations.length===0){return;}var _queue$0$update=this.queue[0].update(dt),stop=_queue$0$update.stop,ddt=_queue$0$update.dt;if(stop){this.__shift();this.update(ddt);}if(this.params.onUpdate&&this.params.onUpdate instanceof Function){this.params.onUpdate(this);}}},{key:'__shift',value:function __shift(){var a=this.queue.shift();a.stop();if(this.params.loop){this.queue.push(a);}if(this.queue.length>0){this.queue[0].start();}else{this.run=false;if(this.params.onComplete&&this.params.onComplete instanceof Function){this.params.onComplete(this);}}}/** start animations */},{key:'start',value:function start(onComplete){if(this.params.animations.length===0){return this;}if(onComplete){this.params.onComplete=onComplete;}this.queue=_lodash2.default.map(this.params.animations,function(a){return a;});this.run=true;this.queue[0].start();return this;}/** stop animations */},{key:'stop',value:function stop(){var applyTo=arguments.length>0&&arguments[0]!==undefined?arguments[0]:true;this.run=false;this.params.loop=false;if(applyTo){_lodash2.default.forEach(this.params.animations,function(a){return a.stop(applyTo);});}return this;}}]);return TAnimator;}();exports.default=TAnimator;module.exports=exports['default'];