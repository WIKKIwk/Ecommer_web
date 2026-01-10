using System;
using System.Collections.Generic;

namespace CSharpFunctions
{
    public class Permutations
    {
        /// <summary>
        /// Generates all permutations of an array
        /// </summary>
        public static List<T[]> Generate<T>(T[] array)
        {
            if (array == null)
                return new List<T[]>();
            
            List<T[]> result = new List<T[]>();
            GeneratePermutations(array, 0, array.Length - 1, result);
            return result;
        }
        
        private static void GeneratePermutations<T>(T[] array, int left, int right, List<T[]> result)
        {
            if (left == right)
            {
                T[] copy = new T[array.Length];
                Array.Copy(array, copy, array.Length);
                result.Add(copy);
            }
            else
            {
                for (int i = left; i <= right; i++)
                {
                    Swap(ref array[left], ref array[i]);
                    GeneratePermutations(array, left + 1, right, result);
                    Swap(ref array[left], ref array[i]);
                }
            }
        }
        
        private static void Swap<T>(ref T a, ref T b)
        {
            T temp = a;
            a = b;
            b = temp;
        }
    }
}
