using System;

namespace CSharpFunctions
{
    public class EnvironmentUtilities
    {
        /// <summary>
        /// Gets environment variable value
        /// </summary>
        public static string GetEnvVariable(string name, string defaultValue = null)
        {
            return Environment.GetEnvironmentVariable(name) ?? defaultValue;
        }
        
        /// <summary>
        /// Sets environment variable
        /// </summary>
        public static void SetEnvVariable(string name, string value)
        {
            Environment.SetEnvironmentVariable(name, value);
        }
        
        /// <summary>
        /// Gets current directory
        /// </summary>
        public static string GetCurrentDirectory()
        {
            return Environment.CurrentDirectory;
        }
    }
}
