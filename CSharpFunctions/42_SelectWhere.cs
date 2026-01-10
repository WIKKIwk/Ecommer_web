using System;
using System.Linq;

namespace CSharpFunctions
{
    public class ArraySelector
    {
        /// <summary>
        /// Selects and transforms array elements
        /// </summary>
        public static TResult[] Select<T, TResult>(T[] array, Func<T, TResult> selector)
        {
            if (array == null || selector == null)
                throw new ArgumentNullException();
            
            return array.Select(selector).ToArray();
        }
        
        /// <summary>
        /// Filters array elements based on predicate
        /// </summary>
        public static T[] Where<T>(T[] array, Func<T, bool> predicate)
        {
            if (array == null || predicate == null)
                throw new ArgumentNullException();
            
            return array.Where(predicate).ToArray();
        }
    }
}
