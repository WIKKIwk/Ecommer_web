using System;
using System.Collections.Generic;

namespace CSharpFunctions
{
    public class QueueHelper<T>
    {
        private List<T> items = new List<T>();
        
        /// <summary>
        /// Enqueues an item to the queue
        /// </summary>
        public void Enqueue(T item)
        {
            items.Add(item);
        }
        
        /// <summary>
        /// Dequeues an item from the queue
        /// </summary>
        public T Dequeue()
        {
            if (items.Count == 0)
                throw new InvalidOperationException("Queue is empty");
            
            T item = items[0];
            items.RemoveAt(0);
            return item;
        }
        
        /// <summary>
        /// Peeks at the first item without removing it
        /// </summary>
        public T Peek()
        {
            if (items.Count == 0)
                throw new InvalidOperationException("Queue is empty");
            
            return items[0];
        }
        
        /// <summary>
        /// Gets the count of items
        /// </summary>
        public int Count => items.Count;
    }
}
