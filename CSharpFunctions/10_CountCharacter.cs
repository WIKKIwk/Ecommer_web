using System;
using System.Linq;

namespace CSharpFunctions
{
    public class CharacterCounter
    {
        /// <summary>
        /// Counts the occurrences of a specific character in a string
        /// </summary>
        public static int CountCharacter(string input, char character)
        {
            if (string.IsNullOrEmpty(input))
                return 0;
            
            return input.Count(c => c == character);
        }
    }
}
