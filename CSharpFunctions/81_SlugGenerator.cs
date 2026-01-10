using System;
using System.Text.RegularExpressions;

namespace CSharpFunctions
{
    public class SlugGenerator
    {
        /// <summary>
        /// Converts a string to URL-friendly slug
        /// </summary>
        public static string ToSlug(string text)
        {
            if (string.IsNullOrWhiteSpace(text))
                return string.Empty;
            
            // Convert to lowercase
            string slug = text.ToLowerInvariant();
            
            // Remove accents
            slug = RemoveAccents(slug);
            
            // Replace spaces and special chars with dashes
            slug = Regex.Replace(slug, @"[^a-z0-9\s-]", "");
            slug = Regex.Replace(slug, @"\s+", "-");
            slug = Regex.Replace(slug, @"-+", "-");
            
            return slug.Trim('-');
        }
        
        private static string RemoveAccents(string text)
        {
            var normalizedString = text.Normalize(System.Text.NormalizationForm.FormD);
            var stringBuilder = new System.Text.StringBuilder();
            
            foreach (var c in normalizedString)
            {
                var unicodeCategory = System.Globalization.CharUnicodeInfo.GetUnicodeCategory(c);
                if (unicodeCategory != System.Globalization.UnicodeCategory.NonSpacingMark)
                {
                    stringBuilder.Append(c);
                }
            }
            
            return stringBuilder.ToString().Normalize(System.Text.NormalizationForm.FormC);
        }
    }
}
