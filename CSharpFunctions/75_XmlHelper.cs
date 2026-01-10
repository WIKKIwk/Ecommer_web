using System;
using System.Xml;
using System.Xml.Serialization;
using System.IO;

namespace CSharpFunctions
{
    public class XmlHelper
    {
        /// <summary>
        /// Serializes an object to XML string
        /// </summary>
        public static string Serialize<T>(T obj)
        {
            if (obj == null)
                return string.Empty;
            
            XmlSerializer serializer = new XmlSerializer(typeof(T));
            using (StringWriter writer = new StringWriter())
            {
                serializer.Serialize(writer, obj);
                return writer.ToString();
            }
        }
        
        /// <summary>
        /// Deserializes XML string to object
        /// </summary>
        public static T Deserialize<T>(string xml)
        {
            if (string.IsNullOrWhiteSpace(xml))
                return default(T);
            
            XmlSerializer serializer = new XmlSerializer(typeof(T));
            using (StringReader reader = new StringReader(xml))
            {
                return (T)serializer.Deserialize(reader);
            }
        }
    }
}
