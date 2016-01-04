using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorkingWithKnockoutJS.Models
{
    public class Employee
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public Gender Gender { get; set; }
        public IList<string> EducationList { get; set; }
        public int DepartmentId { get; set; }
    }

    public enum Gender
    {
        Male = 0,
        FeMale = 1
    }
}
