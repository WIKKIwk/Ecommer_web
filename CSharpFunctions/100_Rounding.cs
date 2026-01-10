using System;

namespace CSharpFunctions
{
    public class RoundingUtilities
    {
        /// <summary>
        /// Rounds to nearest integer
        /// </summary>
        public static int RoundToNearest(double value)
        {
            return (int)Math.Round(value);
        }
        
        /// <summary>
        /// Rounds up to nearest integer
        /// </summary>
        public static int RoundUp(double value)
        {
            return (int)Math.Ceiling(value);
        }
        
        /// <summary>
        /// Rounds down to nearest integer
        /// </summary>
        public static int RoundDown(double value)
        {
            return (int)Math.Floor(value);
        }
        
        /// <summary>
        /// Rounds to specified decimal places
        /// </summary>
        public static double RoundToDecimalPlaces(double value, int decimalPlaces)
        {
            return Math.Round(value, decimalPlaces);
        }
    }
}
