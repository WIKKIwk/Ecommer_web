using System;

namespace CSharpFunctions
{
    public class StringTruncator
    {
        /// <summary>
        /// Truncates a string to a specified length and adds ellipsis
        /// </summary>
        public static string Truncate(string input, int maxLength, string suffix = "...")
        {
            if (string.IsNullOrEmpty(input) || input.Length <= maxLength)
                return input;
            
            return input.Substring(0, maxLength - suffix.Length) + suffix;
        }
    }
}
