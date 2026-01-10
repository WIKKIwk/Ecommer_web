using System;

namespace CSharpFunctions
{
    public class RomanNumerals
    {
        /// <summary>
        /// Converts integer to Roman numerals
        /// </summary>
        public static string ToRoman(int number)
        {
            if (number < 1 || number > 3999)
                throw new ArgumentException("Number must be between 1 and 3999");
            
            string[] thousands = { "", "M", "MM", "MMM" };
            string[] hundreds = { "", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM" };
            string[] tens = { "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC" };
            string[] ones = { "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX" };
            
            return thousands[number / 1000] +
                   hundreds[(number % 1000) / 100] +
                   tens[(number % 100) / 10] +
                   ones[number % 10];
        }
        
        /// <summary>
        /// Converts Roman numerals to integer
        /// </summary>
        public static int FromRoman(string roman)
        {
            if (string.IsNullOrEmpty(roman))
                return 0;
            
            var values = new System.Collections.Generic.Dictionary<char, int>
            {
                {'I', 1}, {'V', 5}, {'X', 10}, {'L', 50},
                {'C', 100}, {'D', 500}, {'M', 1000}
            };
            
            int result = 0;
            int prevValue = 0;
            
            for (int i = roman.Length - 1; i >= 0; i--)
            {
                int currentValue = values[roman[i]];
                
                if (currentValue < prevValue)
                    result -= currentValue;
                else
                    result += currentValue;
                
                prevValue = currentValue;
            }
            
            return result;
        }
    }
}
