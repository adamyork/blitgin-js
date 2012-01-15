class Action extends RenderObject
  contructor:(@name)->

        # public static const ENEMY:String = "enemy";
        # public static const PLAYER:String = "player";
# 
        # private var _isComplete:Boolean = false;
        # private var _isAnimating:Boolean = false;
        # private var _hasAnimated:Boolean = false;
        # private var _nonObjectProducing:Boolean = false;
# 
        # private var _width:Number;
        # private var _height:Number;
        # private var _frame:Number = 0;
        # private var _lifeSpan:Number = 0;
        # private var _collisionCoefficient:Number = 0;
        # private var _health:Number;
        # private var _damage:Number;
        # private var _soundLoops:Number = 0;
        # private var _maxVelocityX:Number = 0;
# 
        # private var _owner:String;
        # private var _id:String;
# 
        # private var _bitmapData:BitmapData;
        # private var _sound:Sound;
# 
        # private var _stateLeft:State;
        # private var _stateRight:State;
        # private var _stateCollisionRight:State;
        # private var _stateCollisionLeft:State;
        # private var _stateJumpRight:State;
        # private var _stateJumpLeft:State;
        # private var _state:State;
# 
        # private var _composite:Composite;
        # private var _emitter:Emitter;
# 
        # public function Action()
        # {
        # }
# 
        # public function set width(value:Number):void
        # {
            # _width = value;
        # }
# 
        # override public function get width():Number
        # {
            # return _width;
        # }
# 
        # public function set height(value:Number):void
        # {
            # _height = value;
        # }
# 
        # override public function get height():Number
        # {
            # return _height;
        # }
# 
        # override public function set velocityX(value:Number):void
        # {
            # if(value <= maxVelocityX)
            # {
                # super.velocityX = value;
            # }
        # }
# 
        # public function set maxVelocityX(value:Number):void
        # {
            # _maxVelocityX = value;
        # }
# 
        # public function get maxVelocityX():Number
        # {
            # return _maxVelocityX;
        # }
# 
        # public function get collisionRect():Rectangle
        # {
            # return new Rectangle(x, y, width, height);
        # }
# 
        # public function get collisionCoefficient():Number
        # {
            # return _collisionCoefficient;
        # }
# 
        # public function set collisionCoefficient(value:Number):void
        # {
            # _collisionCoefficient = value;
        # }
# 
        # public function set id(value:String):void
        # {
            # _id = value;
        # }
# 
        # public function get id():String
        # {
            # return _id;
        # }
# 
        # protected function get lifeSpan():Number
        # {
            # return _lifeSpan;
        # }
# 
        # protected function set lifeSpan(value:Number):void
        # {
            # _lifeSpan = value;
        # }
# 
        # public function get health():Number
        # {
            # return _health;
        # }
# 
        # public function get damage():Number
        # {
            # return _damage;
        # }
# 
        # public function set health(value:Number):void
        # {
            # _health = value;
            # if(value <= 0)
            # {
                # _isComplete = true;
            # }
        # }
# 
        # public function set damage(value:Number):void
        # {
            # _damage = value;
        # }
# 
        # public function get owner():String
        # {
            # return _owner;
        # }
# 
        # public function set owner(value:String):void
        # {
            # _owner = value;
        # }
# 
        # public function get nonObjectProducing():Boolean
        # {
            # return _nonObjectProducing;
        # }
# 
        # public function set nonObjectProducing(value:Boolean):void
        # {
            # _nonObjectProducing = value;
        # }
# 
        # public function get isComplete():Boolean
        # {
            # return _isComplete;
        # }
# 
        # public function get isAnimating():Boolean
        # {
            # return _isAnimating;
        # }
# 
        # public function set isAnimating(value:Boolean):void
        # {
            # _isAnimating = value;
        # }
# 
        # public function get hasAnimated():Boolean
        # {
            # return _hasAnimated;
        # }
# 
        # public function set hasAnimated(value:Boolean):void
        # {
            # _hasAnimated = value;
        # }
# 
        # public function get stateLeft():State
        # {
            # return _stateLeft;
        # }
# 
        # public function set stateLeft(value:State):void
        # {
            # _stateLeft = value;
        # }
# 
        # public function get stateRight():State
        # {
            # return _stateRight;
        # }
# 
        # public function set stateRight(value:State):void
        # {
            # _stateRight = value;
        # }
# 
        # public function set stateCollisionLeft(value:State):void
        # {
            # _stateCollisionLeft = value;
        # }
# 
        # public function get stateCollisionLeft():State
        # {
            # return _stateCollisionLeft;
        # }
# 
        # public function set stateCollisionRight(value:State):void
        # {
            # _stateCollisionRight = value;
        # }
# 
        # public function get stateCollisionRight():State
        # {
            # return _stateCollisionRight;
        # }
# 
        # public function set stateJumpRight(value:State):void
        # {
            # _stateJumpRight = value;
        # }
# 
        # public function get stateJumpRight():State
        # {
            # return _stateJumpRight;
        # }
# 
        # public function set stateJumpLeft(value:State):void
        # {
            # _stateJumpLeft = value;
        # }
# 
        # public function get stateJumpLeft():State
        # {
            # return _stateJumpLeft;
        # }
# 
        # public function get state():State
        # {
            # if(direction == 1)
            # {
                # return _stateRight;
            # }
            # else
            # {
                # return _stateLeft;
            # }
        # }
# 
        # public function set composite(value:Composite):void
        # {
            # _composite = value;
        # }
# 
        # public function get composite():Composite
        # {
            # return _composite;
        # }
# 
        # public function set emitter(value:Emitter):void
        # {
            # _emitter = value;
        # }
# 
        # public function get emitter():Emitter
        # {
            # return _emitter;
        # }
# 
        # public function get sound():Sound
        # {
            # return _sound;
        # }
# 
        # public function set sound(value:Sound):void
        # {
            # _sound = value;
        # }
# 
        # public function get soundLoops():Number
        # {
            # return _soundLoops;
        # }
# 
        # public function set soundLoops(value:Number):void
        # {
            # _soundLoops = value;
        # }
# 
        # public function set bitmapData(value:BitmapData):void
        # {
            # _bitmapData = value;
        # }
# 
        # override public function get bitmapData():BitmapData
        # {
            # return _bitmapData;
        # }
# 
        # override public function get frame():Number
        # {
            # return _frame;
        # }
# 
        # override public function set frame(value:Number):void
        # {
            # if(value >= _lifeSpan)
            # {
                # _isComplete = true;
            # }
            # _frame = value;
        # }
