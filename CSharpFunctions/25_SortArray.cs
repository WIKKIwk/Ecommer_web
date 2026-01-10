using System;
using System.Linq;

namespace CSharpFunctions
{
    public class ArraySorter
    {
        /// <summary>
        /// Sorts an array in ascending order
        /// </summary>
        public static void SortAscending<T>(T[] array) where T : IComparable<T>
        {
            if (array == null || array.Length <= 1)
                return;
            
            Array.Sort(array);
        }
        
        /// <summary>
        /// Sorts an array in descending order
        /// </summary>
        public static void SortDescending<T>(T[] array) where T : IComparable<T>
        {
            if (array == null || array.Length <= 1)
                return;
            
            Array.Sort(array);
            Array.Reverse(array);
        }
    }
}
