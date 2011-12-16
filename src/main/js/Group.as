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
package dev.blitgin.element
{

    public class Group
    {
        private var _type:Class;
        private var _positions:Array;
        private var _independence:Number;

        /**
         * Creates a collection of render objects , their initial positions on screen,
         * and the threshold for which they can exist outside of the view port once
         * created.
         *
         * @param type Class The type of object to contruct a group of.
         * @param positions Array The initial position of the object in the context
         * of the maps x , y coordinate system.
         * @param independence Number A threshold the tells the map the distance the objects
         * can exist outside of the viewport.
         *
         */
        public function Group(type:Class, positions:Array = null, independence:Number = 0)
        {
            this.type = type;
            this.positions = positions;
            this.independence = independence;
        }

        public function get type():Class
        {
            return _type;
        }

        public function set type(value:Class):void
        {
            _type = value;
        }

        public function get positions():Array
        {
            return _positions;
        }

        public function set positions(value:Array):void
        {
            _positions = value;
        }

        public function get independence():Number
        {
            return _independence;
        }

        public function set independence(value:Number):void
        {
            _independence = value;
        }
    }
}