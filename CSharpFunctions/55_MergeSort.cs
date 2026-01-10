using System;

namespace CSharpFunctions
{
    public class MergeSort
    {
        /// <summary>
        /// Sorts an array using MergeSort algorithm
        /// </summary>
        public static void Sort<T>(T[] array) where T : IComparable<T>
        {
            if (array == null || array.Length <= 1)
                return;
            
            T[] temp = new T[array.Length];
            MergeSortRecursive(array, temp, 0, array.Length - 1);
        }
        
        private static void MergeSortRecursive<T>(T[] array, T[] temp, int left, int right) where T : IComparable<T>
        {
            if (left < right)
            {
                int mid = (left + right) / 2;
                MergeSortRecursive(array, temp, left, mid);
                MergeSortRecursive(array, temp, mid + 1, right);
                Merge(array, temp, left, mid, right);
            }
        }
        
        private static void Merge<T>(T[] array, T[] temp, int left, int mid, int right) where T : IComparable<T>
        {
            int i = left, j = mid + 1, k = left;
            
            while (i <= mid && j <= right)
            {
                if (array[i].CompareTo(array[j]) <= 0)
                    temp[k++] = array[i++];
                else
                    temp[k++] = array[j++];
            }
            
            while (i <= mid)
                temp[k++] = array[i++];
            
            while (j <= right)
                temp[k++] = array[j++];
            
            for (i = left; i <= right; i++)
                array[i] = temp[i];
        }
    }
}
