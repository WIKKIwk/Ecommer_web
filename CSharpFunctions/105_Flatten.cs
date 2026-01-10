using System;
using System.Linq;

namespace CSharpFunctions
{
    public class CollectionFlatten
    {
        /// <summary>
        /// Flattens a nested array
        /// </summary>
        public static T[] Flatten<T>(T[][] nestedArray)
        {
            if (nestedArray == null)
                return new T[0];
            
            return nestedArray.SelectMany(x => x ?? new T[0]).ToArray();
        }
    }
}
