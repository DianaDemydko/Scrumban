using System;
using System.Net;
using System.Runtime.Serialization;

namespace Scrumban.Controllers
{
    [Serializable]
    internal class HttpResponseException : Exception
    {
        private HttpStatusCode notFound;

        public HttpResponseException()
        {
        }

        public HttpResponseException(HttpStatusCode notFound)
        {
            this.notFound = notFound;
        }

        public HttpResponseException(string message) : base(message)
        {
        }

        public HttpResponseException(string message, Exception innerException) : base(message, innerException)
        {
        }

        protected HttpResponseException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}