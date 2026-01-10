using System;

namespace CSharpFunctions
{
    public class LCMCalculator
    {
        /// <summary>
        /// Calculates the Least Common Multiple of two numbers
        /// </summary>
        public static int LCM(int a, int b)
        {
            if (a == 0 || b == 0)
                return 0;
            
            return Math.Abs(a * b) / GCDCalculator.GCD(a, b);
        }
    }
}
