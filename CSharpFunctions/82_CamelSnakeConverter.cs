using System;
using System.Text;

namespace CSharpFunctions
{
    public class CamelSnakeConverter
    {
        /// <summary>
        /// Converts camelCase to snake_case
        /// </summary>
        public static string CamelToSnake(string input)
        {
            if (string.IsNullOrEmpty(input))
                return input;
            
            StringBuilder result = new StringBuilder();
            result.Append(char.ToLowerInvariant(input[0]));
            
            for (int i = 1; i < input.Length; i++)
            {
                if (char.IsUpper(input[i]))
                {
                    result.Append('_');
                    result.Append(char.ToLowerInvariant(input[i]));
                }
                else
                {
                    result.Append(input[i]);
                }
            }
            
            return result.ToString();
        }
        
        /// <summary>
        /// Converts snake_case to camelCase
        /// </summary>
        public static string SnakeToCamel(string input)
        {
            if (string.IsNullOrEmpty(input))
                return input;
            
            StringBuilder result = new StringBuilder();
            bool capitalizeNext = false;
            
            foreach (char c in input)
            {
                if (c == '_')
                {
                    capitalizeNext = true;
                }
                else if (capitalizeNext)
                {
                    result.Append(char.ToUpperInvariant(c));
                    capitalizeNext = false;
                }
                else
                {
                    result.Append(c);
                }
            }
            
            return result.ToString();
        }
    }
}
