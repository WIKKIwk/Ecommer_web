using System;
using System.Linq;

namespace CSharpFunctions
{
    public class NumberTheory
    {
        /// <summary>
        /// Finds all divisors of a number
        /// </summary>
        public static int[] GetDivisors(int number)
        {
            if (number <= 0)
                return new int[0];
            
            var divisors = new System.Collections.Generic.List<int>();
            
            for (int i = 1; i <= Math.Sqrt(number); i++)
            {
                if (number % i == 0)
                {
                    divisors.Add(i);
                    if (i != number / i)
                        divisors.Add(number / i);
                }
            }
            
            divisors.Sort();
            return divisors.ToArray();
        }
        
        /// <summary>
        /// Checks if a number is perfect (sum of divisors equals the number)
        /// </summary>
        public static bool IsPerfectNumber(int number)
        {
            if (number <= 1)
                return false;
            
            int sum = 1;
            for (int i = 2; i <= Math.Sqrt(number); i++)
            {
                if (number % i == 0)
                {
                    sum += i;
                    if (i != number / i)
                        sum += number / i;
                }
            }
            
            return sum == number;
        }
    }
}
