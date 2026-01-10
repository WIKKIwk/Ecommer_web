using System;
using System.Linq;

namespace CSharpFunctions
{
    public class CollectionEquals
    {
        /// <summary>
        /// Checks if two arrays are equal (same elements in same order)
        /// </summary>
        public static bool AreEqual<T>(T[] array1, T[] array2)
        {
            if (array1 == null && array2 == null)
                return true;
            
            if (array1 == null || array2 == null)
                return false;
            
            return array1.SequenceEqual(array2);
        }
        
        /// <summary>
        /// Checks if two arrays have same elements (order doesn't matter)
        /// </summary>
        public static bool HaveSameElements<T>(T[] array1, T[] array2)
        {
            if (array1 == null && array2 == null)
                return true;
            
            if (array1 == null || array2 == null)
                return false;
            
            if (array1.Length != array2.Length)
                return false;
            
            var sorted1 = array1.OrderBy(x => x).ToArray();
            var sorted2 = array2.OrderBy(x => x).ToArray();
            
            return sorted1.SequenceEqual(sorted2);
        }
    }
}
