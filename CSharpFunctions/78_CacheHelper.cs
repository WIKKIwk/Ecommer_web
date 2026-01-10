using System;

namespace CSharpFunctions
{
    public class CacheHelper<TKey, TValue>
    {
        private class CacheItem
        {
            public TValue Value { get; set; }
            public DateTime Expiration { get; set; }
        }
        
        private System.Collections.Generic.Dictionary<TKey, CacheItem> cache = 
            new System.Collections.Generic.Dictionary<TKey, CacheItem>();
        
        /// <summary>
        /// Adds or updates a value in cache with expiration
        /// </summary>
        public void Set(TKey key, TValue value, TimeSpan expiration)
        {
            cache[key] = new CacheItem
            {
                Value = value,
                Expiration = DateTime.UtcNow.Add(expiration)
            };
        }
        
        /// <summary>
        /// Gets a value from cache
        /// </summary>
        public bool TryGet(TKey key, out TValue value)
        {
            if (cache.ContainsKey(key))
            {
                var item = cache[key];
                
                if (DateTime.UtcNow < item.Expiration)
                {
                    value = item.Value;
                    return true;
                }
                else
                {
                    cache.Remove(key);
                }
            }
            
            value = default(TValue);
            return false;
        }
        
        /// <summary>
        /// Removes expired items from cache
        /// </summary>
        public void CleanExpired()
        {
            var keysToRemove = new System.Collections.Generic.List<TKey>();
            
            foreach (var kvp in cache)
            {
                if (DateTime.UtcNow >= kvp.Value.Expiration)
                    keysToRemove.Add(kvp.Key);
            }
            
            foreach (var key in keysToRemove)
                cache.Remove(key);
        }
    }
}
