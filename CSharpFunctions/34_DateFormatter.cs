using System;

namespace CSharpFunctions
{
    public class DateFormatter
    {
        /// <summary>
        /// Formats a DateTime to a readable string
        /// </summary>
        public static string FormatDate(DateTime date, string format = "yyyy-MM-dd")
        {
            return date.ToString(format);
        }
        
        /// <summary>
        /// Gets the difference between two dates in days
        /// </summary>
        public static int DaysBetween(DateTime start, DateTime end)
        {
            return (int)(end - start).TotalDays;
        }
    }
}
