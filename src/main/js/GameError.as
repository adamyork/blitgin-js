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
    import mx.logging.ILogger;
    import mx.logging.Log;
    import mx.logging.targets.TraceTarget;

    public class GameError
    {
        /**
         * GameError add a log target to the log.
         * <p>In general this class will not be used by anyone working outside
         * of the blitgin source.
         * </p>
         *
         */
        public function GameError()
        {
            Log.addTarget(new TraceTarget());
        }

        /**
         *
         * @param clazz
         * @param func
         *
         */
        internal static function typeError(clazz:Class, func:String):void
        {
            throw new Error("" + func + " is does not implement " + clazz);
        }

        /**
         *
         * @param clazz
         * @param func
         *
         */
        public static function warnNotUsed(clazz:String, func:String):void
        {
            var logger:ILogger = Log.getLogger("TraceTarget");
            logger.warn("WARNING :: {1} is not used by {0}. Stack is " + new Error().getStackTrace(), clazz, func);
        }
    }
}