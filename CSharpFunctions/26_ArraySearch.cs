using System;
using System.Linq;

namespace CSharpFunctions
{
    public class ArraySearcher
    {
        /// <summary>
        /// Checks if an array contains a specific element
        /// </summary>
        public static bool Contains<T>(T[] array, T value)
        {
            if (array == null)
                return false;
            
            return array.Contains(value);
        }
        
        /// <summary>
        /// Finds the index of the first occurrence of a value
        /// </summary>
        public static int IndexOf<T>(T[] array, T value)
        {
            if (array == null)
                return -1;
            
            return Array.IndexOf(array, value);
        }
    }
}
