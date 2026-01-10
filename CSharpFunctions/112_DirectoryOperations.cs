using System;
using System.IO;

namespace CSharpFunctions
{
    public class DirectoryOperations
    {
        /// <summary>
        /// Creates a directory if it doesn't exist
        /// </summary>
        public static void EnsureDirectory(string directoryPath)
        {
            if (!Directory.Exists(directoryPath))
                Directory.CreateDirectory(directoryPath);
        }
        
        /// <summary>
        /// Deletes a directory and all its contents
        /// </summary>
        public static void DeleteDirectory(string directoryPath, bool recursive = true)
        {
            if (Directory.Exists(directoryPath))
                Directory.Delete(directoryPath, recursive);
        }
        
        /// <summary>
        /// Gets all files in a directory
        /// </summary>
        public static string[] GetFiles(string directoryPath, string searchPattern = "*")
        {
            if (!Directory.Exists(directoryPath))
                return new string[0];
            
            return Directory.GetFiles(directoryPath, searchPattern);
        }
    }
}
