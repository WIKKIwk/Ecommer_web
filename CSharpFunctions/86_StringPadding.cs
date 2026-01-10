using System;
using System.Linq;

namespace CSharpFunctions
{
    public class StringPadding
    {
        /// <summary>
        /// Centers a string within a specified width
        /// </summary>
        public static string Center(string text, int width, char fillChar = ' ')
        {
            if (string.IsNullOrEmpty(text) || width <= text.Length)
                return text;
            
            int totalPadding = width - text.Length;
            int leftPadding = totalPadding / 2;
            int rightPadding = totalPadding - leftPadding;
            
            return new string(fillChar, leftPadding) + text + new string(fillChar, rightPadding);
        }
        
        /// <summary>
        /// Pads string to the left
        /// </summary>
        public static string PadLeft(string text, int width, char fillChar = ' ')
        {
            if (text == null)
                text = string.Empty;
            
            return text.PadLeft(width, fillChar);
        }
        
        /// <summary>
        /// Pads string to the right
        /// </summary>
        public static string PadRight(string text, int width, char fillChar = ' ')
        {
            if (text == null)
                text = string.Empty;
            
            return text.PadRight(width, fillChar);
        }
    }
}
