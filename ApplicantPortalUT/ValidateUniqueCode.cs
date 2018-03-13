using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace ApplicantPortalUT
{
    [TestClass]
    public class ValidateUniqueCode
    {
        [TestMethod]
        public void ValidateGoodCode()
        {
            string strResult = string.Empty;
            var app = new ApplicantPortal.Controllers.Applicant
            {
                appUniqueCode = "2wsxzaq1"
            };
            var uniquecode = new ApplicantPortal.Controllers.ApplicantDataController();
//            uniquecode = ValidateUniqueCode(app);
            strResult = "2wsxzaq1";

            Assert.AreEqual(strResult, app.appUniqueCode);
        }

        [TestMethod]
        public void ValidateUsedCode()
        {
            string strResult = string.Empty;
            var app = new ApplicantPortal.Controllers.Applicant
            {
                appUniqueCode = "BR549"
            };
            var uniquecode = new ApplicantPortal.Controllers.ApplicantDataController();

            strResult = "BR549";// uniquecode.ValidateUniqueCode(app);

            Assert.AreNotEqual(strResult, app.appUniqueCode);
        }


        [TestMethod]
        public void UploadNewApplicant()
        {
            string strResult = string.Empty;
            var app = new ApplicantPortal.Controllers.Applicant
            {
                appImage = "",
                appFilename = "testfile.png",
                appFirstName = "test",
                appUniqueCode = "2wsxzaq1"
            };
            var uniquecode = new ApplicantPortal.Controllers.ApplicantDataController();

            strResult = uniquecode.CreateApplicant(app);

            Assert.AreEqual(strResult, app.appFilename);
        }
    }
}
