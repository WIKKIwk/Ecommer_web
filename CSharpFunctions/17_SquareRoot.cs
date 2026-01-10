using System;

namespace CSharpFunctions
{
    public class SquareRootCalculator
    {
        /// <summary>
        /// Calculates square root using Newton's method
        /// </summary>
        public static double SquareRoot(double number, double tolerance = 0.00001)
        {
            if (number < 0)
                throw new ArgumentException("Cannot calculate square root of negative number");
            
            if (number == 0)
                return 0;
            
            double guess = number / 2.0;
            while (Math.Abs(guess * guess - number) > tolerance)
            {
                guess = (guess + number / guess) / 2.0;
            }
            
            return guess;
        }
    }
}
