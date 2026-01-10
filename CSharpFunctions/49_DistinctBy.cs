using System;
using System.Linq;

namespace CSharpFunctions
{
    public class ArrayDistinct
    {
        /// <summary>
        /// Gets distinct elements using a key selector
        /// </summary>
        public static T[] DistinctBy<T, TKey>(T[] array, Func<T, TKey> keySelector)
        {
            if (array == null || keySelector == null)
                throw new ArgumentNullException();
            
            return array.GroupBy(keySelector).Select(g => g.First()).ToArray();
        }
    }
}
