using System.Web;
using System.Web.Mvc;

namespace KockoutJS_CrossroadsJS
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
