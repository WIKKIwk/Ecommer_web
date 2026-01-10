using System;
using System.Linq;

namespace CSharpFunctions
{
    public class WordWrapper
    {
        /// <summary>
        /// Wraps text to specified line width
        /// </summary>
        public static string WrapText(string text, int maxWidth)
        {
            if (string.IsNullOrEmpty(text) || maxWidth <= 0)
                return text;
            
            string[] words = text.Split(' ');
            System.Text.StringBuilder result = new System.Text.StringBuilder();
            System.Text.StringBuilder currentLine = new System.Text.StringBuilder();
            
            foreach (string word in words)
            {
                if (currentLine.Length + word.Length + 1 > maxWidth)
                {
                    if (currentLine.Length > 0)
                    {
                        result.AppendLine(currentLine.ToString());
                        currentLine.Clear();
                    }
                }
                
                if (currentLine.Length > 0)
                    currentLine.Append(" ");
                
                currentLine.Append(word);
            }
            
            if (currentLine.Length > 0)
                result.Append(currentLine.ToString());
            
            return result.ToString();
        }
    }
}
