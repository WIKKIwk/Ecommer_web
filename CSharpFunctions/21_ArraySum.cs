using System;
using System.Linq;

namespace CSharpFunctions
{
    public class ArrayUtilities
    {
        /// <summary>
        /// Finds the sum of all elements in an array
        /// </summary>
        public static int Sum(int[] array)
        {
            if (array == null || array.Length == 0)
                return 0;
            
            return array.Sum();
        }
    }
}
