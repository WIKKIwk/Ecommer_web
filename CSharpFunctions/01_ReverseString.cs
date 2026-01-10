using System;

namespace CSharpFunctions
{
    public class StringUtilities
    {
        /// <summary>
        /// Reverses a given string
        /// </summary>
        public static string ReverseString(string input)
        {
            if (string.IsNullOrEmpty(input))
                return input;
            
            char[] charArray = input.ToCharArray();
            Array.Reverse(charArray);
            return new string(charArray);
        }
    }
}
