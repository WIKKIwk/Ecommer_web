using System;

namespace CSharpFunctions
{
    public class StringRepeater
    {
        /// <summary>
        /// Repeats a string a specified number of times
        /// </summary>
        public static string RepeatString(string input, int count)
        {
            if (string.IsNullOrEmpty(input) || count <= 0)
                return string.Empty;
            
            return string.Concat(System.Linq.Enumerable.Repeat(input, count));
        }
    }
}
