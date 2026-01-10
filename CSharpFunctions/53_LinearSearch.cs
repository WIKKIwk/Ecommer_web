using System;

namespace CSharpFunctions
{
    public class LinearSearch
    {
        /// <summary>
        /// Performs linear search on an array
        /// </summary>
        public static int Search<T>(T[] array, T value) where T : IEquatable<T>
        {
            if (array == null)
                return -1;
            
            for (int i = 0; i < array.Length; i++)
            {
                if (array[i].Equals(value))
                    return i;
            }
            
            return -1;
        }
    }
}
