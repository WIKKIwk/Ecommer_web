using System;
using System.Linq;

namespace CSharpFunctions
{
    public class ArrayOrderer
    {
        /// <summary>
        /// Orders array by a key selector
        /// </summary>
        public static T[] OrderBy<T, TKey>(T[] array, Func<T, TKey> keySelector) where TKey : IComparable<TKey>
        {
            if (array == null || keySelector == null)
                throw new ArgumentNullException();
            
            return array.OrderBy(keySelector).ToArray();
        }
        
        /// <summary>
        /// Orders array in descending order by a key selector
        /// </summary>
        public static T[] OrderByDescending<T, TKey>(T[] array, Func<T, TKey> keySelector) where TKey : IComparable<TKey>
        {
            if (array == null || keySelector == null)
                throw new ArgumentNullException();
            
            return array.OrderByDescending(keySelector).ToArray();
        }
    }
}
