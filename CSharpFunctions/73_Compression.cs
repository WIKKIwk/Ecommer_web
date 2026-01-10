using System;
using System.IO;
using System.IO.Compression;
using System.Text;

namespace CSharpFunctions
{
    public class CompressionHelper
    {
        /// <summary>
        /// Compresses a string using GZip
        /// </summary>
        public static byte[] Compress(string text)
        {
            byte[] bytes = Encoding.UTF8.GetBytes(text);
            
            using (MemoryStream output = new MemoryStream())
            {
                using (GZipStream gzip = new GZipStream(output, CompressionMode.Compress))
                {
                    gzip.Write(bytes, 0, bytes.Length);
                }
                return output.ToArray();
            }
        }
        
        /// <summary>
        /// Decompresses GZip compressed data
        /// </summary>
        public static string Decompress(byte[] compressedBytes)
        {
            using (MemoryStream input = new MemoryStream(compressedBytes))
            using (GZipStream gzip = new GZipStream(input, CompressionMode.Decompress))
            using (MemoryStream output = new MemoryStream())
            {
                gzip.CopyTo(output);
                return Encoding.UTF8.GetString(output.ToArray());
            }
        }
    }
}
