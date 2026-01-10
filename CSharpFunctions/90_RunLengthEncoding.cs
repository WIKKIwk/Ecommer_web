using System;
using System.Text;

namespace CSharpFunctions
{
    public class StringCompressor
    {
        /// <summary>
        /// Compresses a string using run-length encoding
        /// </summary>
        public static string RunLengthEncode(string input)
        {
            if (string.IsNullOrEmpty(input))
                return input;
            
            StringBuilder result = new StringBuilder();
            int count = 1;
            
            for (int i = 0; i < input.Length; i++)
            {
                if (i + 1 < input.Length && input[i] == input[i + 1])
                {
                    count++;
                }
                else
                {
                    result.Append(input[i]);
                    if (count > 1)
                        result.Append(count);
                    count = 1;
                }
            }
            
            return result.Length < input.Length ? result.ToString() : input;
        }
        
        /// <summary>
        /// Decompresses a run-length encoded string
        /// </summary>
        public static string RunLengthDecode(string input)
        {
            if (string.IsNullOrEmpty(input))
                return input;
            
            StringBuilder result = new StringBuilder();
            int i = 0;
            
            while (i < input.Length)
            {
                char currentChar = input[i];
                i++;
                
                StringBuilder countStr = new StringBuilder();
                while (i < input.Length && char.IsDigit(input[i]))
                {
                    countStr.Append(input[i]);
                    i++;
                }
                
                int count = countStr.Length > 0 ? int.Parse(countStr.ToString()) : 1;
                result.Append(new string(currentChar, count));
            }
            
            return result.ToString();
        }
    }
}
