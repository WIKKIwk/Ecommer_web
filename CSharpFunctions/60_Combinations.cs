using System;
using System.Collections.Generic;

namespace CSharpFunctions
{
    public class Combinations
    {
        /// <summary>
        /// Generates all combinations of specified size from an array
        /// </summary>
        public static List<T[]> Generate<T>(T[] array, int size)
        {
            if (array == null || size <= 0 || size > array.Length)
                return new List<T[]>();
            
            List<T[]> result = new List<T[]>();
            T[] buffer = new T[size];
            GenerateCombinations(array, buffer, 0, 0, size, result);
            return result;
        }
        
        private static void GenerateCombinations<T>(T[] array, T[] buffer, int startIndex, int bufferIndex, int size, List<T[]> result)
        {
            if (bufferIndex == size)
            {
                T[] copy = new T[size];
                Array.Copy(buffer, copy, size);
                result.Add(copy);
                return;
            }
            
            for (int i = startIndex; i < array.Length; i++)
            {
                buffer[bufferIndex] = array[i];
                GenerateCombinations(array, buffer, i + 1, bufferIndex + 1, size, result);
            }
        }
    }
}
