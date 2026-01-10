using System;

namespace CSharpFunctions
{
    public class FactorialCalculator
    {
        /// <summary>
        /// Calculates the factorial of a number
        /// </summary>
        public static long Factorial(int n)
        {
            if (n < 0)
                throw new ArgumentException("Number must be non-negative");
            
            if (n == 0 || n == 1)
                return 1;
            
            long result = 1;
            for (int i = 2; i <= n; i++)
            {
                result *= i;
            }
            
            return result;
        }
    }
}
