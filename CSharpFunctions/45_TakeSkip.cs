using System;
using System.Linq;

namespace CSharpFunctions
{
    public class ArrayTaker
    {
        /// <summary>
        /// Takes the first N elements from array
        /// </summary>
        public static T[] Take<T>(T[] array, int count)
        {
            if (array == null)
                return null;
            
            return array.Take(count).ToArray();
        }
        
        /// <summary>
        /// Skips the first N elements and returns the rest
        /// </summary>
        public static T[] Skip<T>(T[] array, int count)
        {
            if (array == null)
                return null;
            
            return array.Skip(count).ToArray();
        }
    }
}
