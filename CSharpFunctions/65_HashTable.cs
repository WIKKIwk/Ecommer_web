using System;
using System.Collections.Generic;

namespace CSharpFunctions
{
    public class HashTableHelper<TKey, TValue>
    {
        private Dictionary<TKey, TValue> table = new Dictionary<TKey, TValue>();
        
        /// <summary>
        /// Adds or updates a key-value pair
        /// </summary>
        public void Put(TKey key, TValue value)
        {
            table[key] = value;
        }
        
        /// <summary>
        /// Gets a value by key
        /// </summary>
        public TValue Get(TKey key)
        {
            if (table.ContainsKey(key))
                return table[key];
            
            throw new KeyNotFoundException($"Key not found: {key}");
        }
        
        /// <summary>
        /// Tries to get a value by key
        /// </summary>
        public bool TryGet(TKey key, out TValue value)
        {
            return table.TryGetValue(key, out value);
        }
        
        /// <summary>
        /// Removes a key-value pair
        /// </summary>
        public bool Remove(TKey key)
        {
            return table.Remove(key);
        }
        
        /// <summary>
        /// Checks if key exists
        /// </summary>
        public bool ContainsKey(TKey key)
        {
            return table.ContainsKey(key);
        }
    }
}
