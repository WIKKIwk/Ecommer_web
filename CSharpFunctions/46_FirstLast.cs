using System;
using System.Linq;

namespace CSharpFunctions
{
    public class ArrayFirstLast
    {
        /// <summary>
        /// Gets the first element or default value
        /// </summary>
        public static T FirstOrDefault<T>(T[] array)
        {
            return array != null && array.Length > 0 ? array[0] : default(T);
        }
        
        /// <summary>
        /// Gets the last element or default value
        /// </summary>
        public static T LastOrDefault<T>(T[] array)
        {
            return array != null && array.Length > 0 ? array[array.Length - 1] : default(T);
        }
        
        /// <summary>
        /// Gets single element or throws exception
        /// </summary>
        public static T Single<T>(T[] array)
        {
            if (array == null || array.Length != 1)
                throw new InvalidOperationException("Array must contain exactly one element");
            
            return array[0];
        }
    }
}
