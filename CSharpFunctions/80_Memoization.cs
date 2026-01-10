using System;
using System.Collections.Generic;

namespace CSharpFunctions
{
    public class MemoizationHelper
    {
        /// <summary>
        /// Memoizes a function to cache results
        /// </summary>
        public static Func<T, TResult> Memoize<T, TResult>(Func<T, TResult> func)
        {
            Dictionary<T, TResult> cache = new Dictionary<T, TResult>();
            
            return arg =>
            {
                if (cache.ContainsKey(arg))
                    return cache[arg];
                
                TResult result = func(arg);
                cache[arg] = result;
                return result;
            };
        }
        
        /// <summary>
        /// Memoizes a function with two parameters
        /// </summary>
        public static Func<T1, T2, TResult> Memoize<T1, T2, TResult>(Func<T1, T2, TResult> func)
        {
            Dictionary<Tuple<T1, T2>, TResult> cache = new Dictionary<Tuple<T1, T2>, TResult>();
            
            return (arg1, arg2) =>
            {
                var key = Tuple.Create(arg1, arg2);
                
                if (cache.ContainsKey(key))
                    return cache[key];
                
                TResult result = func(arg1, arg2);
                cache[key] = result;
                return result;
            };
        }
    }
}
