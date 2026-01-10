using System;
using System.Linq;

namespace CSharpFunctions
{
    public class StringManipulation
    {
        /// <summary>
        /// Removes all whitespace from a string
        /// </summary>
        public static string RemoveWhitespace(string input)
        {
            if (string.IsNullOrEmpty(input))
                return input;
            
            return new string(input.Where(c => !char.IsWhiteSpace(c)).ToArray());
        }
    }
}
