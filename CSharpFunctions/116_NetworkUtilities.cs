using System;
using System.Net;

namespace CSharpFunctions
{
    public class NetworkUtilities
    {
        /// <summary>
        /// Downloads string content from URL
        /// </summary>
        public static string DownloadString(string url)
        {
            using (WebClient client = new WebClient())
            {
                return client.DownloadString(url);
            }
        }
        
        /// <summary>
        /// Downloads file from URL
        /// </summary>
        public static void DownloadFile(string url, string destinationPath)
        {
            using (WebClient client = new WebClient())
            {
                client.DownloadFile(url, destinationPath);
            }
        }
        
        /// <summary>
        /// Checks if URL is reachable
        /// </summary>
        public static bool IsUrlReachable(string url)
        {
            try
            {
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
                request.Method = "HEAD";
                request.Timeout = 5000;
                
                using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
                {
                    return response.StatusCode == HttpStatusCode.OK;
                }
            }
            catch
            {
                return false;
            }
        }
    }
}
