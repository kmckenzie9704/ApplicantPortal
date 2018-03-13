using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Newtonsoft.Json;

namespace ApplicantPortal.Controllers
{
    [Produces("application/json")]
    [Route("api/Applicant")]
    public class ApplicantDataController : Controller
    {

        [HttpPost("[action]")]
        public IEnumerable<UniqueCode> ValidateUniqueCode([FromBody] Applicant Applicant)
        {
            string strUniqueCode = string.Empty; 

            var json = JsonConvert.SerializeObject(Applicant);
            JsonSerializer serializer = new JsonSerializer();

            //string URL = "http://localhost/unique/api/ValidateUniqueCode";
            string URL = "https://validateuniquecode.azurewebsites.net/api/validateuniquecode";
            byte[] postBytes = Encoding.UTF8.GetBytes(json);

            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(URL);
            request.Method = "POST";
            request.ContentType = "application/json; charset=utf-8";
            request.Headers["Authorization"] = "Basic " + Convert.ToBase64String(Encoding.GetEncoding("ISO-8859-1").GetBytes("username:password"));
            request.PreAuthenticate = true;
            request.ContentLength = postBytes.Length;

            Stream requestStream = request.GetRequestStream();
            requestStream.Write(postBytes, 0, postBytes.Length);
            requestStream.Close();


            HttpWebResponse response = request.GetResponse() as HttpWebResponse;
            using (Stream responseStream = response.GetResponseStream())
            {
                StreamReader reader = new StreamReader(responseStream, Encoding.UTF8);
                strUniqueCode = reader.ReadToEnd();
            }

            if (!strUniqueCode.StartsWith('['))
                strUniqueCode = "[" + strUniqueCode + "]";

            IEnumerable<UniqueCode> uniqueCode = JsonConvert.DeserializeObject<IEnumerable<UniqueCode>>(strUniqueCode);

            return uniqueCode;

            //bool blnIsValid = false;
            //blnIsValid = System.Convert.ToBoolean(strReturn);

            //if (blnIsValid)
            //{
            //    strReturn = Applicant.appUniqueCode;
            //}
            //else
            //    strReturn = string.Empty;

            //return strReturn;
        }

        [HttpPost("[action]")]
        public string CreateApplicant([FromBody] Applicant NewApplicant)
        {
            var json = JsonConvert.SerializeObject(NewApplicant);
            JsonSerializer serializer = new JsonSerializer();

            string strReturn = CreateNewApplicant(json);
            AcceptNewApplicant(json);
            return strReturn;
        }

        private string CreateNewApplicant(string json)
        {
            string strReturn = string.Empty;

            //string URL = "http://localhost/createapp/api/CreateApplicant";
            string URL = "https://createapplicant.azurewebsites.net/api/createapplicant";
            byte[] postBytes = Encoding.UTF8.GetBytes(json);

            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(URL);
            request.Method = "POST";
            request.ContentType = "application/json; charset=utf-8";
            request.Headers["Authorization"] = "Basic " + Convert.ToBase64String(Encoding.GetEncoding("ISO-8859-1").GetBytes("username:password"));
            request.PreAuthenticate = true;
            request.ContentLength = postBytes.Length;

            Stream requestStream = request.GetRequestStream();
            requestStream.Write(postBytes, 0, postBytes.Length);
            requestStream.Close();


            HttpWebResponse response = request.GetResponse() as HttpWebResponse;
            using (Stream responseStream = response.GetResponseStream())
            {
                StreamReader reader = new StreamReader(responseStream, Encoding.UTF8);
                strReturn = reader.ReadToEnd();
            }
            return strReturn;

        }

        private string AcceptNewApplicant(string json)
        {
            string strReturn = string.Empty;

            string URL = "https://acceptuniquecode.azurewebsites.net/api/acceptuniquecode";
            byte[] postBytes = Encoding.UTF8.GetBytes(json);

            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(URL);
            request.Method = "POST";
            request.ContentType = "application/json; charset=utf-8";
            request.Headers["Authorization"] = "Basic " + Convert.ToBase64String(Encoding.GetEncoding("ISO-8859-1").GetBytes("username:password"));
            request.PreAuthenticate = true;
            request.ContentLength = postBytes.Length;

            Stream requestStream = request.GetRequestStream();
            requestStream.Write(postBytes, 0, postBytes.Length);
            requestStream.Close();


            HttpWebResponse response = request.GetResponse() as HttpWebResponse;
            using (Stream responseStream = response.GetResponseStream())
            {
                StreamReader reader = new StreamReader(responseStream, Encoding.UTF8);
                strReturn = reader.ReadToEnd();
            }
            return strReturn;

        }

    }

    public class Applicant
    {
        public int appId;
        public string appFirstName;
        public string appLastName;
        public string appBirthdate;
        public string appUniqueCode;
        public string appStatus;
        public string appResolution;
        public string appFilename;
        public string appEmail;
        public string appImage;
    }

    public class UniqueCode
    {
        public string uniCode { get; set; }
        public string uniEmail { get; set; }
        public DateTime? uniAssignDate { get; set; }
        public DateTime? uniAcceptDate { get; set; }
        public bool uniAccepted { get; set; }
    }

    }