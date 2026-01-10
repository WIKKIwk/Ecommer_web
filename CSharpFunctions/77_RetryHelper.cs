using System;
using System.Threading;
using System.Threading.Tasks;

namespace CSharpFunctions
{
    public class RetryHelper
    {
        /// <summary>
        /// Retries an action with exponential backoff
        /// </summary>
        public static void RetryWithBackoff(Action action, int maxRetries = 3, int baseDelayMs = 100)
        {
            int retryCount = 0;
            
            while (retryCount < maxRetries)
            {
                try
                {
                    action();
                    return;
                }
                catch (Exception)
                {
                    retryCount++;
                    
                    if (retryCount >= maxRetries)
                        throw;
                    
                    int delay = baseDelayMs * (int)Math.Pow(2, retryCount - 1);
                    Thread.Sleep(delay);
                }
            }
        }
        
        /// <summary>
        /// Retries a function with exponential backoff
        /// </summary>
        public static T RetryWithBackoff<T>(Func<T> func, int maxRetries = 3, int baseDelayMs = 100)
        {
            int retryCount = 0;
            
            while (retryCount < maxRetries)
            {
                try
                {
                    return func();
                }
                catch (Exception)
                {
                    retryCount++;
                    
                    if (retryCount >= maxRetries)
                        throw;
                    
                    int delay = baseDelayMs * (int)Math.Pow(2, retryCount - 1);
                    Thread.Sleep(delay);
                }
            }
            
            throw new Exception("Retry failed");
        }
    }
}
