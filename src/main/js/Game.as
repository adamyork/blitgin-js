/*
   Copyright (c) 2011 Adam York

   Permission is hereby granted, free of charge, to any person obtaining a copy
   of this software and associated documentation files (the "Software"), to deal
   in the Software without restriction, including without limitation the rights
   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   copies of the Software, and to permit persons to whom the Software is
   furnished to do so, subject to the following conditions:

   The above copyright notice and this permission notice shall be included in
   all copies or substantial portions of the Software.

   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   THE SOFTWARE.
 */
/**
 * blitgin-as is intended to serve as a platform in which to quickly
 * create 2D platforming and side scrolling games.
 *
 * @author Adam York
 * @since 5.1.11
 * home: http://www.adamyorkdev.com/
 * contact: vertigo.index@gmail.com
 *
 * */
package dev.blitgin.element
{
    import dev.blitgin.BlitginVersion;
    import dev.blitgin.element.character.Player;
    import dev.blitgin.element.engine.CollisionEngine;
    import dev.blitgin.element.engine.ICollisionEngine;
    import dev.blitgin.element.engine.IPhysicEngine;
    import dev.blitgin.element.engine.IRenderEngine;
    import dev.blitgin.element.engine.InputVO;
    import dev.blitgin.element.engine.PhysicsEngine;
    import dev.blitgin.element.engine.RenderEngine;
    import dev.blitgin.element.engine.SoundEngine;
    import dev.blitgin.element.map.Map;

    import flash.display.Bitmap;
    import flash.display.BitmapData;
    import flash.display.Stage;
    import flash.events.Event;
    import flash.events.KeyboardEvent;
    import flash.utils.Dictionary;

    import mx.core.UIComponent;

    public class Game
    {
        public static var VIEWPORT_WIDTH:Number;
        public static var VIEWPORT_HEIGHT:Number;

        private static var _subscribers:Dictionary;

        private var _pause:Boolean = false;

        private var _activeMap:Number = 0;
        private var _activePlayer:Number = 0;
        private var _customKey:Number = 0;

        private var _players:Array = new Array();
        private var _maps:Array = new Array();
        private var _leftKeys:Array = new Array();
        private var _rightKeys:Array = new Array();
        private var _upKeys:Array = new Array();
        private var _downKeys:Array = new Array();
        private var _jumpKeys:Array = new Array();
        private var _customKeys:Array = new Array();

        private var _stage:Stage;
        private var _parent:UIComponent;
        private var _screen:Bitmap;

        private var _renderEngineClass:Class;
        private var _collisionEngineClass:Class;
        private var _physicsEngineClass:Class;
        private var _renderEngine:IRenderEngine;
        private var _soundEngine:SoundEngine;
        private var _movement:KeyboardEvent;
        private var _input:InputVO;

        [version]
        public var version:String;

        public function Game()
        {
            trace("Blitgin_as :: " + BlitginVersion.VERSION);
            _subscribers = new Dictionary();
        }

        /**
         * Returns the custom class set by the implementer if any.
         * @return Class
         *
         */
        public function get renderEngineClass():Class
        {

            return _renderEngineClass;
        }

        /**
         * Sets a custom class defined by the implementer to use as the
         * RenderEngine. Must implement IRenderEngine.
         * @return Class
         * @default null
         * @throws dev.blitgin.element.GamerError If Class doesn't implement IRenderEngine , blocking exception is throw.
         *
         */
        public function set renderEngineClass(value:Class):void
        {
            (value is IRenderEngine) ? _renderEngineClass = value : GameError.typeError(IRenderEngine, "renderEngineClass");
        }

        /**
         * Returns the custom class set by the implementer if any.
         * @return Class
         *
         */
        public function get collisionEngineClass():Class
        {
            return _collisionEngineClass;
        }

        /**
         * Sets a custom class defined by the implementer to use as the
         * CollisionEngine. Must implement ICollisionEngine
         * @return Class
         * @default null
         * @throws dev.blitgin.element.GamerError If Class doesn't implement ICollisionEngine , blocking exception is throw.
         */
        public function set collisionEngineClass(value:Class):void
        {
            (value is ICollisionEngine) ? _collisionEngineClass = value : GameError.typeError(ICollisionEngine, "collisionEngineClass");
        }

        /**
         * Returns the custom class set by the implementer if any.
         * @return Class
         *
         */
        public function get physicsEngineClass():Class
        {
            return _physicsEngineClass;
        }

        /**
         * Sets a custom class defined by the implementer to use as the
         * PhysicEngine. Must implement IPhysicEngine
         * @return Class
         * @default null
         * @throws dev.blitgin.element.GamerError If Class doesn't implement IPhysicEngine , blocking exception is throw.
         */
        public function set physicsEngineClass(value:Class):void
        {
            (value is IPhysicEngine) ? _physicsEngineClass = value : GameError.typeError(IPhysicEngine, "physicsEngineClass");
        }

        /**
         * Returns a collection of all players available to the game as
         * defined by implementer. Should contain at least one.
         * @return Array
         *
         */
        public function get players():Array
        {
            return _players;
        }

        /**
         * Sets a collection of all players available to the game as
         * defined by implementer. Should contain at least one.
         * @param value An Array
         *
         */
        public function set players(value:Array):void
        {
            _players = value;
        }

        /**
         * Returns a collection of all maps available to the game as
         * defined by implementer. Should contain at least one.
         * @return Array
         *
         */
        public function get maps():Array
        {
            return _maps;
        }

        /**
         * Sets a collection of all maps available to the game as
         * defined by implementer. Should contain at least one.
         * @param value An Array
         *
         */
        public function set maps(value:Array):void
        {
            _maps = value;
        }

        /**
         * Sets the current map that will render.
         * @param value A Number representing the index of the map in maps.
         * @see #maps
         */
        public function set activeMap(value:Number):void
        {
            _activeMap = value;
        }

        /**
         * Gets the current index of map that is rendering.
         * @return Number
         * @see #maps
         */
        public function get activeMap():Number
        {
            return _activeMap;
        }

        /**
         * Sets the current player that will render and be controlled.
         * @param value A Number representing the index of the player in players.
         * @see #players
         */
        public function set activePlayer(value:Number):void
        {
            _activePlayer = value;
        }

        /**
         * Gets the current index of player that is rendering.
         * @return Number
         * @see #players
         */
        public function get activePlayer():Number
        {
            return _activePlayer;
        }

        /**
         * Gets a collection of keyboard keys the will move the player left
         * as defined by the implementer.
         * @return Array
         */
        public function get leftKeys():Array
        {
            return _leftKeys;
        }

        /**
         * Sets a collection of keyboard keys the will move the player left
         * as defined by the implementer. These should be valid uint keycodes.
         * @param Array
         */
        public function set leftKeys(value:Array):void
        {
            _leftKeys = value;
        }

        /**
         * Gets a collection of keyboard keys the will move the player right
         * as defined by the implementer.
         * @return Array
         */
        public function get rightKeys():Array
        {
            return _rightKeys;
        }

        /**
         * Sets a collection of keyboard keys the will move the player right
         * as defined by the implementer. These should be valid uint keycodes.
         * @param Array
         */
        public function set rightKeys(value:Array):void
        {
            _rightKeys = value;
        }

        /**
         * Gets a collection of keyboard keys the will move the player up
         * as defined by the implementer. These should be valid uint keycodes.
         * @returns Array
         */
        public function get upKeys():Array
        {
            return _upKeys;
        }

        /**
         * Sets a collection of keyboard keys the will move the player up
         * as defined by the implementer. Currently not leveraged by the render engine.
         * @param Array
         */
        public function set upKeys(value:Array):void
        {
            _upKeys = value;
        }

        /**
         * Gets a collection of keyboard keys the will move the player down
         * as defined by the implementer. These should be valid uint keycodes.
         * @returns Array
         */
        public function get downKeys():Array
        {
            return _downKeys;
        }

        /**
         * Sets a collection of keyboard keys the will move the player down
         * as defined by the implementer. Currently not leveraged by the render engine.
         * @param Array
         */
        public function set downKeys(value:Array):void
        {
            _downKeys = value;
        }

        /**
         * Gets a collection of keyboard keys the will make the player jump
         * as defined by the implementer.
         * @returns Array
         */
        public function get jumpKeys():Array
        {
            return _jumpKeys;
        }

        /**
         * Sets a collection of keyboard keys the will make the player jump
         * as defined by the implementer.  These should be valid uint keycodes.
         * @param Array
         */
        public function set jumpKeys(value:Array):void
        {
            _jumpKeys = value;
        }

        /**
         * Gets a collection of keyboard keys the will make invoke custom actions
         * bound to those keys as defined by the implementer.
         * @returns Array
         */
        public function get customKeys():Array
        {
            return _customKeys;
        }

        /**
         * Sets a collection of keyboard keys the will make invoke custom actions
         * bound to those keys as defined by the implementer.
         * @param Array
         */
        public function set customKeys(value:Array):void
        {
            _customKeys = value;
        }

        /**
         * Wether or not the render engine is rendering.
         * @returns Boolean
         */
        public function get pause():Boolean
        {
            return _pause;
        }

        /**
         * Toggles the render engine. If false the last frame painted will remain in screen.
         * @default false
         * @param Boolean
         */
        public function set pause(value:Boolean):void
        {
            _pause = value;
        }

        /**
         * Sets up basic properties of the game including dimensions and screen.
         * @param parent UIComponent The object in which to attach the screen to.
         * @param width Number The width of the viewport.
         * @param height Number The height of the viewport.
         */
        public function preinitialize(parent:UIComponent, width:Number, height:Number):void
        {
            _parent = parent;

            VIEWPORT_HEIGHT = height;
            VIEWPORT_WIDTH = width;

            _screen = new Bitmap();
            _screen.bitmapData = new BitmapData(1024, 423, false, 0x000000FF);
            _parent.addChild(_screen);
            _parent.addEventListener(Event.ADDED_TO_STAGE, initialize);
        }

        /**
         * This method should be left alone. It instantiates the various engines the games uses.
         * Also sets up global listeners for keyboard events.
         * @param event Event Object passed in when screen is added to stage.
         *
         */
        public function initialize(event:Event):void
        {
            _parent.removeEventListener(Event.ADDED_TO_STAGE, initialize);
            _stage = _parent.stage;

            if(_renderEngineClass == null)
            {
                _renderEngine = new RenderEngine();
            }
            else
            {
                _renderEngine = new _renderEngineClass() as IRenderEngine;
            }

            if(_collisionEngineClass == null)
            {
                _renderEngine.collisionEngine = new CollisionEngine();
            }
            else
            {
                _renderEngine.collisionEngine = new _collisionEngineClass() as ICollisionEngine;
            }

            if(_physicsEngineClass == null)
            {
                _renderEngine.physicsEngine = new PhysicsEngine();
            }
            else
            {
                _renderEngine.physicsEngine = new _physicsEngineClass() as IPhysicEngine;
            }

            if(_maps.length == 0)
            {
                throw new Error("Blitgin_as :: [ERROR] :: you need at least one map.");
            }

            if(_players.length == 0)
            {
                throw new Error("Blitgin_as :: [ERROR] :: you need at least one player.");
            }

            _soundEngine = new SoundEngine();
            _renderEngine.soundEngine = _soundEngine;

            var map:Class = _maps[_activeMap] as Class;
            var player:Class = _players[_activePlayer] as Class;

            _renderEngine.screen = _screen;
            _renderEngine.map = new map() as Map;
            _renderEngine.player = new player() as Player;

            _input = new InputVO();
            _input.direction = 0;
            _input.jump = 0;
            _input.jumpLock = false;
            _input.customKey = 0;

            addListeners();
        }

        protected function addListeners():void
        {
            _stage.addEventListener(KeyboardEvent.KEY_UP, manageMovement);
            _stage.addEventListener(KeyboardEvent.KEY_DOWN, manageMovement);
        }

        protected function removeListeners():void
        {
            _stage.removeEventListener(KeyboardEvent.KEY_UP, manageMovement);
            _stage.removeEventListener(KeyboardEvent.KEY_DOWN, manageMovement);
        }

        /**
         * Function to be called by implementer from parent. Without calling this
         * directly the game will not start.
         *
         */
        public function start():void
        {
            _stage.addEventListener(Event.ENTER_FRAME, render);
        }

        /**
         * The single thread , render loop that drives the game. If paused
         * the render engine is not called.
         * @param event Event The event object from the handler.
         *
         */
        protected function render(event:Event):void
        {
            if(_pause)
            {
                return;
            }
            _renderEngine.render(_input);
        }

        /**
         * This function is the global input handler for the keyboard. Handles
         * any keys mapped to the various key type collections and supplies the
         * render engine with an InputVO.
         *
         * @param event KeyboardEvent The event object passed in by the handler.
         *
         */
        protected function manageMovement(event:KeyboardEvent = null):void
        {
            if(_input.disabled)
            {
                return;
            }
            if(event.type == KeyboardEvent.KEY_UP)
            {
                _input.direction = (checkKey(_leftKeys, event.keyCode)) ? 0 : _input.direction;
                _input.direction = (checkKey(_rightKeys, event.keyCode)) ? 0 : _input.direction;
                _input.vDirection = (checkKey(_upKeys, event.keyCode)) ? 0 : _input.vDirection;
                _input.vDirection = (checkKey(_downKeys, event.keyCode)) ? 0 : _input.vDirection;
                _input.jump = (checkKey(_jumpKeys, event.keyCode)) ? 0 : _input.jump;
                _input.customKey = (checkKey(_customKeys, event.keyCode)) ? 0 : _input.customKey;
            }
            else
            {
                _input.direction = (checkKey(_leftKeys, event.keyCode)) ? -1 : _input.direction;
                _input.direction = (checkKey(_rightKeys, event.keyCode)) ? 1 : _input.direction;
                _input.vDirection = (checkKey(_upKeys, event.keyCode)) ? -1 : _input.direction;
                _input.vDirection = (checkKey(_downKeys, event.keyCode)) ? 1 : _input.direction;
                _input.jump = (checkKey(_jumpKeys, event.keyCode)) ? 1 : _input.jump;

                if(checkKey(_customKeys, event.keyCode))
                {
                    _input.customKey = _customKeys[_customKey];
                }
            }
        }

        protected function checkKey(arr:Array, keyCode:uint):Boolean
        {
            var index:int = arr.indexOf(keyCode, 0);
            _customKey = index;
            return (index != -1);
        }

        /**
         * Function can be explicitly called by implementer to ensure proper
         * GC of run time objects.
         *
         */
        public function dispose():void
        {
            removeListeners();

            _players = null;
            _maps = null;
            _leftKeys = null;
            _rightKeys = null;
            _upKeys = null;
            _downKeys = null;
            _jumpKeys = null;
            _customKeys = null;

            _renderEngineClass = null;
            _renderEngine.dispose();
            _soundEngine = null;
            _movement = null;
            _input = null;
            _subscribers = null;
            _screen.bitmapData.dispose();
            _screen = null;
        }

        /**
         * This is the main messaging vehicle within blitgin. It is called at the end of
         * every render cycle and can be used to aggregate information for UI , backend,
         * etc.
         *
         * @param map Map The current map.
         * @param player Player The current player.
         * @param actions Array A collection of ActionObjects the may exist on screen.
         *
         */
        public static function notifySubscribers(map:Map, player:Player, actions:Array):void
        {
            for each(var subscriber:ISubscriber in _subscribers)
            {
                subscriber.notify(map, player, actions);
            }
        }

        /**
         * A static function to register any object with game for notification.
         *
         * @param subscriber ISubscriber Any object the implementer would like
         * to have access to game data.
         *
         */
        public static function subscribe(subscriber:ISubscriber):void
        {
            _subscribers[subscriber] = subscriber;
        }

        /**
         * A static function to unregister any object with game for notification.
         *
         * @param subscriber ISubscriber Any object the implementer would like
         * to have access to game data.
         *
         */
        public static function unsubscribe(subscriber:ISubscriber):void
        {
            delete _subscribers[subscriber];
        }
    }
}