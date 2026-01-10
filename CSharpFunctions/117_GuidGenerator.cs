using System;
using System.Text;

namespace CSharpFunctions
{
    public class GuidGenerator
    {
        /// <summary>
        /// Generates a new GUID
        /// </summary>
        public static string NewGuid()
        {
            return Guid.NewGuid().ToString();
        }
        
        /// <summary>
        /// Generates a new GUID without dashes
        /// </summary>
        public static string NewGuidNoDashes()
        {
            return Guid.NewGuid().ToString("N");
        }
        
        /// <summary>
        /// Validates if a string is a valid GUID
        /// </summary>
        public static bool IsValidGuid(string guid)
        {
            return Guid.TryParse(guid, out _);
        }
    }
}
