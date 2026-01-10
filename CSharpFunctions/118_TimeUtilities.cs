using System;

namespace CSharpFunctions
{
    public class TimeUtilities
    {
        /// <summary>
        /// Gets current Unix timestamp
        /// </summary>
        public static long GetUnixTimestamp()
        {
            return DateTimeOffset.UtcNow.ToUnixTimeSeconds();
        }
        
        /// <summary>
        /// Converts Unix timestamp to DateTime
        /// </summary>
        public static DateTime UnixTimestampToDateTime(long timestamp)
        {
            return DateTimeOffset.FromUnixTimeSeconds(timestamp).DateTime;
        }
        
        /// <summary>
        /// Gets time ago string (e.g., "2 hours ago")
        /// </summary>
        public static string TimeAgo(DateTime dateTime)
        {
            TimeSpan timeSpan = DateTime.UtcNow - dateTime.ToUniversalTime();
            
            if (timeSpan.TotalSeconds < 60)
                return "just now";
            else if (timeSpan.TotalMinutes < 60)
                return $"{(int)timeSpan.TotalMinutes} minutes ago";
            else if (timeSpan.TotalHours < 24)
                return $"{(int)timeSpan.TotalHours} hours ago";
            else if (timeSpan.TotalDays < 30)
                return $"{(int)timeSpan.TotalDays} days ago";
            else if (timeSpan.TotalDays < 365)
                return $"{(int)(timeSpan.TotalDays / 30)} months ago";
            else
                return $"{(int)(timeSpan.TotalDays / 365)} years ago";
        }
    }
}
