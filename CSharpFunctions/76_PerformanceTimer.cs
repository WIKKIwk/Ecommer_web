using System;
using System.Diagnostics;

namespace CSharpFunctions
{
    public class PerformanceTimer
    {
        /// <summary>
        /// Measures execution time of an action
        /// </summary>
        public static TimeSpan MeasureExecutionTime(Action action)
        {
            if (action == null)
                throw new ArgumentNullException(nameof(action));
            
            Stopwatch stopwatch = Stopwatch.StartNew();
            action();
            stopwatch.Stop();
            
            return stopwatch.Elapsed;
        }
        
        /// <summary>
        /// Measures execution time and returns result
        /// </summary>
        public static (T result, TimeSpan elapsed) MeasureExecutionTime<T>(Func<T> func)
        {
            if (func == null)
                throw new ArgumentNullException(nameof(func));
            
            Stopwatch stopwatch = Stopwatch.StartNew();
            T result = func();
            stopwatch.Stop();
            
            return (result, stopwatch.Elapsed);
        }
    }
}
