using System;
using System.Linq;

namespace CSharpFunctions
{
    public class ArrayFilter
    {
        /// <summary>
        /// Filters an array to get only unique elements
        /// </summary>
        public static T[] GetUniqueElements<T>(T[] array)
        {
            if (array == null)
                return null;
            
            return array.Distinct().ToArray();
        }
        
        /// <summary>
        /// Removes duplicates from array
        /// </summary>
        public static T[] RemoveDuplicates<T>(T[] array)
        {
            return GetUniqueElements(array);
        }
    }
}
