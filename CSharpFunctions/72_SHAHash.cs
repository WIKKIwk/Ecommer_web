using System;
using System.Security.Cryptography;
using System.Text;

namespace CSharpFunctions
{
    public class SHAHash
    {
        /// <summary>
        /// Generates SHA256 hash of a string
        /// </summary>
        public static string SHA256Hash(string input)
        {
            if (string.IsNullOrEmpty(input))
                return string.Empty;
            
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] inputBytes = Encoding.UTF8.GetBytes(input);
                byte[] hashBytes = sha256.ComputeHash(inputBytes);
                
                StringBuilder sb = new StringBuilder();
                foreach (byte b in hashBytes)
                {
                    sb.Append(b.ToString("x2"));
                }
                return sb.ToString();
            }
        }
        
        /// <summary>
        /// Generates SHA512 hash of a string
        /// </summary>
        public static string SHA512Hash(string input)
        {
            if (string.IsNullOrEmpty(input))
                return string.Empty;
            
            using (SHA512 sha512 = SHA512.Create())
            {
                byte[] inputBytes = Encoding.UTF8.GetBytes(input);
                byte[] hashBytes = sha512.ComputeHash(inputBytes);
                
                StringBuilder sb = new StringBuilder();
                foreach (byte b in hashBytes)
                {
                    sb.Append(b.ToString("x2"));
                }
                return sb.ToString();
            }
        }
    }
}
