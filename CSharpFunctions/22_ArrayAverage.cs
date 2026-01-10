using System;
using System.Linq;

namespace CSharpFunctions
{
    public class ArrayAverage
    {
        /// <summary>
        /// Calculates the average of all elements in an array
        /// </summary>
        public static double Average(int[] array)
        {
            if (array == null || array.Length == 0)
                throw new ArgumentException("Array cannot be null or empty");
            
            return array.Average();
        }
    }
}
