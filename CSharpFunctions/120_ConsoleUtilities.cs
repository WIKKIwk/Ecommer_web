using System;

namespace CSharpFunctions
{
    public class ConsoleUtilities
    {
        /// <summary>
        /// Prints colored text to console
        /// </summary>
        public static void PrintColored(string text, ConsoleColor color)
        {
            ConsoleColor originalColor = Console.ForegroundColor;
            Console.ForegroundColor = color;
            Console.WriteLine(text);
            Console.ForegroundColor = originalColor;
        }
        
        /// <summary>
        /// Reads password from console (hidden input)
        /// </summary>
        public static string ReadPassword()
        {
            string password = "";
            ConsoleKeyInfo key;
            
            do
            {
                key = Console.ReadKey(true);
                
                if (key.Key != ConsoleKey.Backspace && key.Key != ConsoleKey.Enter)
                {
                    password += key.KeyChar;
                    Console.Write("*");
                }
                else if (key.Key == ConsoleKey.Backspace && password.Length > 0)
                {
                    password = password.Substring(0, password.Length - 1);
                    Console.Write("\b \b");
                }
            }
            while (key.Key != ConsoleKey.Enter);
            
            Console.WriteLine();
            return password;
        }
        
        /// <summary>
        /// Clears console
        /// </summary>
        public static void Clear()
        {
            Console.Clear();
        }
    }
}
