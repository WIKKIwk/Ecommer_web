using System;
using System.Text.RegularExpressions;

namespace CSharpFunctions
{
    public class UrlValidator
    {
        /// <summary>
        /// Validates if a string is a valid URL
        /// </summary>
        public static bool IsValidUrl(string url)
        {
            if (string.IsNullOrWhiteSpace(url))
                return false;
            
            return Uri.TryCreate(url, UriKind.Absolute, out Uri uriResult)
                && (uriResult.Scheme == Uri.UriSchemeHttp || uriResult.Scheme == Uri.UriSchemeHttps);
        }
    }
}
