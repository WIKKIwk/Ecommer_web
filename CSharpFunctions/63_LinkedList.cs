using System;
using System.Collections.Generic;

namespace CSharpFunctions
{
    public class LinkedListNode<T>
    {
        public T Data { get; set; }
        public LinkedListNode<T> Next { get; set; }
        
        public LinkedListNode(T data)
        {
            Data = data;
            Next = null;
        }
    }
    
    public class LinkedListHelper<T>
    {
        private LinkedListNode<T> head;
        
        /// <summary>
        /// Adds a node to the beginning
        /// </summary>
        public void AddFirst(T data)
        {
            LinkedListNode<T> newNode = new LinkedListNode<T>(data);
            newNode.Next = head;
            head = newNode;
        }
        
        /// <summary>
        /// Adds a node to the end
        /// </summary>
        public void AddLast(T data)
        {
            LinkedListNode<T> newNode = new LinkedListNode<T>(data);
            
            if (head == null)
            {
                head = newNode;
                return;
            }
            
            LinkedListNode<T> current = head;
            while (current.Next != null)
            {
                current = current.Next;
            }
            current.Next = newNode;
        }
        
        /// <summary>
        /// Removes first occurrence of data
        /// </summary>
        public bool Remove(T data)
        {
            if (head == null)
                return false;
            
            if (head.Data.Equals(data))
            {
                head = head.Next;
                return true;
            }
            
            LinkedListNode<T> current = head;
            while (current.Next != null)
            {
                if (current.Next.Data.Equals(data))
                {
                    current.Next = current.Next.Next;
                    return true;
                }
                current = current.Next;
            }
            
            return false;
        }
    }
}
