using System;
using System.Security.Cryptography;
using System.Text;

namespace CSharpFunctions
{
    public class HashGenerator
    {
        /// <summary>
        /// Generates MD5 hash of a string
        /// </summary>
        public static string GenerateMD5Hash(string input)
        {
            if (string.IsNullOrEmpty(input))
                return string.Empty;
            
            using (MD5 md5 = MD5.Create())
            {
                byte[] inputBytes = Encoding.UTF8.GetBytes(input);
                byte[] hashBytes = md5.ComputeHash(inputBytes);
                
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
