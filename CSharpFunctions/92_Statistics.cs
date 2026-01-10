using System;

namespace CSharpFunctions
{
    public class Statistics
    {
        /// <summary>
        /// Calculates median of array
        /// </summary>
        public static double Median(int[] array)
        {
            if (array == null || array.Length == 0)
                throw new ArgumentException("Array cannot be null or empty");
            
            int[] sorted = (int[])array.Clone();
            Array.Sort(sorted);
            
            int mid = sorted.Length / 2;
            
            if (sorted.Length % 2 == 0)
                return (sorted[mid - 1] + sorted[mid]) / 2.0;
            else
                return sorted[mid];
        }
        
        /// <summary>
        /// Calculates mode (most frequent value)
        /// </summary>
        public static int Mode(int[] array)
        {
            if (array == null || array.Length == 0)
                throw new ArgumentException("Array cannot be null or empty");
            
            var frequency = new System.Collections.Generic.Dictionary<int, int>();
            
            foreach (int num in array)
            {
                if (frequency.ContainsKey(num))
                    frequency[num]++;
                else
                    frequency[num] = 1;
            }
            
            int mode = array[0];
            int maxCount = 0;
            
            foreach (var kvp in frequency)
            {
                if (kvp.Value > maxCount)
                {
                    maxCount = kvp.Value;
                    mode = kvp.Key;
                }
            }
            
            return mode;
        }
    }
}
