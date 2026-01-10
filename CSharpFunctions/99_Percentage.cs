using System;

namespace CSharpFunctions
{
    public class Percentage
    {
        /// <summary>
        /// Calculates percentage of a value
        /// </summary>
        public static double CalculatePercentage(double value, double total)
        {
            if (total == 0)
                return 0;
            
            return (value / total) * 100;
        }
        
        /// <summary>
        /// Calculates value from percentage
        /// </summary>
        public static double GetValueFromPercentage(double percentage, double total)
        {
            return (percentage / 100) * total;
        }
        
        /// <summary>
        /// Calculates percentage increase
        /// </summary>
        public static double PercentageIncrease(double oldValue, double newValue)
        {
            if (oldValue == 0)
                return 0;
            
            return ((newValue - oldValue) / oldValue) * 100;
        }
    }
}
