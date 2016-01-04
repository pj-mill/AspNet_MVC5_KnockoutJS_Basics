using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WorkingWithKnockoutJS.Models;

namespace WorkingWithKnockoutJS.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            //return new HttpStatusCodeResult(200);

            return View();
        }

        public ActionResult SimpleValidation()
        {
            return View("Index");
        }

        [HttpPost]
        public ActionResult SaveEmployee(Employee emp)
        {
            //EmployeeModel save code here
            //return View("EmployeeInfo");
            return new HttpStatusCodeResult(400);

        }
    }
}